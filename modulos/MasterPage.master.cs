using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class modulos_MasterPage : System.Web.UI.MasterPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        // valida ie < 8
        if (Request.Browser.Type.ToUpper().Contains("IE"))
        {
            if (Request.Browser.MajorVersion <= 8)
                Response.Redirect("https://whatbrowser.org/");
        }
    }
}
