using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GG_MVC.Controllers
{
    public class UploadController : Controller
    {
        public ActionResult Index(HttpPostedFileBase file)
        {
            List<Emp> csEmp = new List<Emp>()
            {
                new Emp(){ nIndexNo = 1, strName = "red", bUpload = false},
                new Emp(){ nIndexNo = 2, strName = "blue", bUpload = false},
                new Emp(){ nIndexNo = 3, strName = "pink", bUpload = false},
            };
            if (file != null)
            {
                string strPost = Request.Form["postid"];
                var Model = csEmp.FirstOrDefault(x => x.nIndexNo == Convert.ToInt32(strPost));
                Model.bUpload = true;
            }
            return View(csEmp);
        }

    }

    public class Emp
    { 
        public int nIndexNo { get; set; }
        public string strName { get; set; }
        public bool bUpload { get; set; }
    }
}