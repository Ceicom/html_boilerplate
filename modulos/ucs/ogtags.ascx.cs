using System;

public partial class modulos_ucs_ogtags : System.Web.UI.UserControl
{
    public string title { get; set; }
    public string description { get; set; }
    public string image { get; set; }

    protected void Page_Load(object sender, EventArgs e)
    {
        if (string.IsNullOrEmpty(title))
            title = "Título Página";
        else
            title += " - Título Página";

        if (string.IsNullOrEmpty(description))
            description = "Descrição Página.";

        if (string.IsNullOrEmpty(image))
            image = Request.Url.Scheme + "://" + Request.Url.Authority + "/images/social/share.jpg";
    }
}