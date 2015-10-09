<%@ WebHandler Language="C#" Class="tempoagora" %>

using System;
using System.Web;

public class tempoagora : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {

        context.Response.ContentType = "text/xml";

        var client = new System.Net.WebClient();
        var reply = client.DownloadString(string.Format("http://www.tempoagora.com.br/rss/cidades/rss_prev_Corumba-MS.xml"));

        context.Response.Write(reply);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}