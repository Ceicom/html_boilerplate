<%@ WebHandler Language="C#" Class="captcha" %>

using System;
using System.Web;
using System.Configuration;

public class captcha : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {

        // Modelo DIV: @<div class="g-recaptcha" data-sitekey="6Lc9tP8SAAAAAKfA4Hwpo0QredfWcVlMxgIxUUnk"></div>
        
        context.Response.ContentType = "text/json";
        
        string response = context.Request["g-recaptcha-response"];
        string secret = ConfigurationManager.AppSettings["recaptcha-secretkey"].ToString();

        var client = new System.Net.WebClient();
        var reply = client.DownloadString(string.Format("https://www.google.com/recaptcha/api/siteverify?secret={0}&response={1}", secret, response));

        context.Response.Write(reply);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}
