<%@ WebHandler Language="C#" Class="formularios" %>

using System;
using System.Web;

public class formularios : IHttpHandler {

    public void ProcessRequest (HttpContext context) {

        //System.Threading.Thread.Sleep(1000);

        context.Response.ContentType = "text/plain";
        string type = context.Request.QueryString["type"];

        /*
         * Com a implementação do API FileReader é obrigatório manter a captura do arquivo para retorno correto, segue modelo:
         * @FILE: HttpPostedFile arquivo = context.Request.Files["nomeInputFile"];
         *
         * Seguem campos de cada formulário:
         * @TYPE: exemplo
         * campo1
         *
         * RETORNO DOS DADOS:
         * 0 : quando algum dos campos veio vazio.
         * 1 : mensagem enviada com sucesso
         * 2 : erro durante o envio de sua mensagem
         * {texto} : mensagem de erro personalizada
         */

        HttpPostedFile arquivo = context.Request.Files["file"];

        string retorno = string.Empty;

        foreach(string key in context.Request.Form){
            retorno += String.Format("{0} <> {1}\n", key, context.Request.Form[key]);
        }

        context.Response.Write(retorno);
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}