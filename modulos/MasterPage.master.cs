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
        // valida ie < 9
        if (Request.Browser.Type.ToUpper().Contains("IE"))
        {
            if (Request.Browser.MajorVersion <= 9)
                Response.Redirect("https://whatbrowser.org/");
        }
    }
}
