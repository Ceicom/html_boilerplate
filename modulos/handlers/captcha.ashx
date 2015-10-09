<%@ WebHandler Language="C#" Class="captcha" %>

using System;
using System.Web;

public class captcha : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {

        //System.Threading.Thread.Sleep(2500);
        
        context.Response.ContentType = "text/json";
        
        string response = context.Request["g-recaptcha-response"];
        string secret = context.Request["g-recaptcha-secret"];

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