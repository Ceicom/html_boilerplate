using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;

public partial class modulos_MasterPage : System.Web.UI.MasterPage
{
    public string cacheVersion { get; set; }

    protected void Page_Load(object sender, EventArgs e)
    {
        // valida ie < 9
        if (Request.Browser.Type.ToUpper().Contains("IE") && Request.Browser.MajorVersion <= 9)
            Response.Redirect("https://browser-update.org/update-browser.html");

        // cache
        cacheVersion = HttpContext.Current.Request.IsLocal ? DateTime.Now.Ticks.ToString() : ConfigurationManager.AppSettings.Get("cacheVersion");
    }
}
