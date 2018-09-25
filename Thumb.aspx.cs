using System;
using System.Linq;
using System.Web;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Drawing2D;
using System.IO;

/*

Thumb.NET version 3.1, by wyllyan@wyllyan.com

    * Parameters
    w: Width
    h: Height
    only w or h: Proportional resize
    b: Background color (html type)
    c: Condition
        = 0 -> don't crop (fixed size)
        = 1 -> crop       (fixed size)
    i: Interpolation Mode
        = 0 -> High Quality Bicubic
        = 1 -> High Quality Bilinear
    p: Precision

*/

public partial class Thumb : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            double proporcao;
            int w, h, xCrop, yCrop;
            string imgName = Request.QueryString["img"];
            byte crop = Convert.ToByte(Request.QueryString["c"]);
            string colorName = Request.QueryString["b"];
            int interpolationMode = Convert.ToInt16(Request.QueryString["i"]);

            //Precisão do redimensionamento
            int p = Convert.ToInt32(Request.QueryString["p"]);

            int widthT = Convert.ToInt32(Request.QueryString["w"]);
            int heightT = Convert.ToInt32(Request.QueryString["h"]);

            //Nome da imagem a ser cacheada ou comparada
            string strImg = imgName.Substring(0, imgName.LastIndexOf('.')) + "_" + widthT + "x" + heightT + "_" + crop.ToString() + (string.IsNullOrEmpty(colorName) ? "" : "_" + colorName) + "_" + interpolationMode + "_" + p + imgName.Substring(imgName.LastIndexOf('.'));

            //Path com as imagens "cacheadas"
            string cachePath = Path.Combine(Server.MapPath("~/Arquivos/ThumbCache/"), strImg);

            //Dados da última
            DateTime dataModCache = File.GetLastWriteTime(Server.MapPath(imgName));
            DateTime dataModImg = File.GetLastWriteTime(cachePath);

            int comparacao = DateTime.Compare(dataModCache, dataModImg);

            //Se o arquivo já existe no cache
            if (File.Exists(cachePath) && comparacao <= 0)
            {
                OutputCacheResponse(HttpContext.Current, File.GetLastWriteTime(cachePath));
                HttpContext.Current.Response.WriteFile(cachePath);
                return;
            }
            else
            {

                //Cria diretório com as imagens (parâmetro)
                Directory.CreateDirectory(Path.GetDirectoryName(cachePath));

                //Deleta se já existe imagem cacheada
                if (File.Exists(cachePath))
                {
                    File.Delete(cachePath);
                }

                //Cria o "bitmap" com imagem original
                string imgPath = HttpContext.Current.Request.MapPath("~/" + imgName);
                Bitmap bmp = new Bitmap(imgPath);
                ImageFormat formato = bmp.RawFormat;
                double widthO = bmp.Size.Width;
                double heightO = bmp.Size.Height;

                //Caso só largura ou altura sejam transmitidas
                if (widthT == 0 || heightT == 0)
                {
                    //Cálculo com base na largura (widthT)
                    if (widthT > 0)
                    {
                        heightO = widthT / (widthO / heightO);
                        widthO = widthT;
                        heightT = Convert.ToInt32(heightO);
                        //Cálculo com base na altura (heightT)
                    }
                    else
                    {
                        widthO = heightT / (heightO / widthO);
                        heightO = heightT;
                        widthT = Convert.ToInt32(widthO);
                    }
                }
                else
                {
                    //Caso opção seja "CROPAR"
                    if (crop == 1)
                    {
                        //Se uma das medidas originais forem MAIORES que o "Target"
                        if (widthO > widthT || heightO > heightT)
                        {
                            proporcao = widthO / heightO;
                            while (widthO > widthT || heightO > heightT)
                            {
                                widthO--;
                                heightO = widthO / proporcao;
                                if (widthO <= widthT && heightO <= heightT)
                                {
                                    break;
                                }
                            }
                        }
                        //Se uma das medidas originais forem MENORES que o "Target"
                        if (widthO < widthT || heightO < heightT)
                        {
                            proporcao = widthO / heightO;
                            while (widthO < widthT || heightO < heightT)
                            {
                                widthO++;
                                heightO = widthO / proporcao;
                                if (widthO >= widthT && heightO >= heightT)
                                {
                                    break;
                                }
                            }
                        }
                    }
                    else
                    {
                        //Se uma das medidas originais forem MAIORES que o "Target"
                        if (widthO > widthT || heightO > heightT)
                        {
                            proporcao = widthO / heightO;
                            while (widthO > widthT || heightO > heightT)
                            {
                                widthO--;
                                heightO = widthO / proporcao;
                                if (widthO <= widthT && heightO <= heightT)
                                {
                                    break;
                                }
                            }
                        }
                        else
                        {
                            //Se uma das medidas originais forem MENORES que o "Target"
                            if (widthO < widthT || heightO < heightT)
                            {
                                proporcao = widthO / heightO;
                                while (widthO < widthT && heightO < heightT)
                                {
                                    widthO++;
                                    heightO = widthO / proporcao;
                                    if (widthO >= widthT && heightO >= heightT)
                                    {
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }

                //Medidas finais (incluindo valor de precisão)
                w = Convert.ToInt32(widthO) + p;
                h = Convert.ToInt32(heightO) + p;

                //Calcula as coordenadas para corte
                xCrop = Convert.ToInt32((w - widthT) / 2);
                yCrop = Convert.ToInt32((h - heightT) / 2);

                Bitmap bmpT = new Bitmap(widthT, heightT);

                EncoderParameter qualityParam = new EncoderParameter(Encoder.Quality, 95L);
                //Image codec
                ImageCodecInfo imgCodec = ImageCodecInfo.GetImageEncoders().FirstOrDefault(a => a.FormatID == formato.Guid);
                EncoderParameters encoderParams = new EncoderParameters(1);
                encoderParams.Param[0] = qualityParam;

                //Cor de fundo
                Color bg = Color.White;

                //Caso a cor não seja transmitida
                if (string.IsNullOrEmpty(colorName))
                {
                    //se PNG "transparent"
                    if (formato.Equals(ImageFormat.Png) || formato.Equals(ImageFormat.Gif))
                        bg = Color.Transparent;
                }
                else
                {
                    try
                    {
                        //Html color (hex)
                        bg = ColorTranslator.FromHtml("#" + colorName);
                    }
                    catch (Exception)
                    {
                        //Html color
                        bg = ColorTranslator.FromHtml(colorName);
                    }
                }

                //Manipula e salva em cache
                using (Graphics g = Graphics.FromImage(bmpT))
                {
                    g.CompositingQuality = CompositingQuality.HighSpeed;
                    g.InterpolationMode = interpolationMode == 0 ? InterpolationMode.HighQualityBicubic : InterpolationMode.HighQualityBilinear;
                    g.CompositingMode = CompositingMode.SourceCopy;
                    g.Clear(bg);
                    g.DrawImage(bmp, -xCrop, -yCrop, w, h);
                    using (MemoryStream memoryStream = new MemoryStream())
                    {
                        bmpT.Save(memoryStream, imgCodec, encoderParams);
                        OutputCacheResponse(HttpContext.Current, File.GetLastWriteTime(imgPath));
                        using (FileStream diskCacheStream = new FileStream(cachePath, FileMode.CreateNew))
                        {
                            memoryStream.WriteTo(diskCacheStream);
                        }
                        memoryStream.WriteTo(HttpContext.Current.Response.OutputStream);
                    }
                }

                bmp.Dispose();
                bmpT.Dispose();
            }
        }
        catch (Exception ex)
        {
            Font font = new Font("verdana", 12);
            Bitmap bmp = new Bitmap(ex.Message.Length * 10, 50);
            Graphics g = Graphics.FromImage(bmp);
            g.DrawString(ex.Message.Replace("'", ""), font, new SolidBrush(Color.White), new PointF(5.0F, 5.0F));
            bmp.Save(Response.OutputStream, ImageFormat.Jpeg);
            g.Dispose();
            bmp.Dispose();
        }
    }

    //Cache Response
    private void OutputCacheResponse(HttpContext context, DateTime lastModified)
    {
        HttpCachePolicy cachePolicy = context.Response.Cache;
        cachePolicy.SetCacheability(HttpCacheability.Public);
        cachePolicy.VaryByParams["img"] = true;
        cachePolicy.VaryByParams["w"] = true;
        cachePolicy.VaryByParams["h"] = true;
        cachePolicy.VaryByParams["c"] = true;
        cachePolicy.VaryByParams["b"] = true;
        cachePolicy.VaryByParams["i"] = true;
        cachePolicy.VaryByParams["p"] = true;
        cachePolicy.SetOmitVaryStar(true);
        cachePolicy.SetExpires(DateTime.Now + TimeSpan.FromDays(1));
        //cachePolicy.SetExpires(DateTime.Now);
        cachePolicy.SetValidUntilExpires(true);
        cachePolicy.SetLastModified(lastModified);
    }

}
