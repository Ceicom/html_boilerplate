<%@ WebHandler Language="C#" Class="captcha" %>

using System.Web;
using System.Configuration;

public class captcha : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {

        /*
         * exemplo de código para o CAPTCHA
         *
         * 1) add a library
         *    using System.Configuration;
         *
         * 2) create a string in public methods
         *    public string sitekey { get; set; }
         *
         * 3) add config in void Page_Load
         *    sitekey = ConfigurationManager.AppSettings["recaptcha-sitekey"].ToString();
         *
         * 4) inside form
         *    <div class="g-recaptcha" data-sitekey="<%=sitekey%>"></div>
         *
         */

        context.Response.ContentType = "text/json";

        string response = context.Request["g-recaptcha-response"];
        string secret = ConfigurationManager.AppSettings["recaptcha-secretkey"].ToString();

        var client = new System.Net.WebClient();
        var reply = client.DownloadString(string.Format("https://www.google.com/recaptcha/api/siteverify?secret={0}&response={1}", secret, response));

        context.Response.Write(reply);
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}
