<%@ WebHandler Language="C#" Class="formularios" %>

using System;
using System.Web;

public class formularios : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {

        //System.Threading.Thread.Sleep(1000);
        
        context.Response.ContentType = "text/plain";
        string type = context.Request.QueryString["type"];
        
        /*
         * type = contato
         * Contém os seguintes campos:
         * - txtName
         * - txtEmail
         * - txtTel
         * - txtSubject (opcional)
         * - ddSector
         * - txtMsg
         * 
         * type = newsletter (form newsletter 'rodapé' )
         * Contém os seguintes campos:
         * - txtNewsEmail
         * 
         * RETORNO DOS DADOS:
         * 0 : quando algum dos campos veio vazio.
         * 1 : mensagem enviada com sucesso
         * 2 : erro durante o envio de sua mensagem
         */


        foreach(string key in context.Request.Form){
          context.Response.Write(String.Format("{0}: {1} \n", key, context.Request.Form[key]));
        }

        //context.Response.Write("1");
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}