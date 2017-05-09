using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        /*exemplo de código para o CAPTCHA
        
        #add a library
        using System.Configuration;
        
        #create a string in public methods
        public string sitekey { get; set; }
        
        #add config in void Page_Load
        sitekey = ConfigurationManager.AppSettings["recaptcha-sitekey"].ToString();
        
        #inside form
        <div class="g-recaptcha" data-sitekey="<%=sitekey%>"></div>
        
        */
    }
}
