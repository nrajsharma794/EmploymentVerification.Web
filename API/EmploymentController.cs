using EmploymentVerification.Web.TransportModels;
using EmploymentVerification.Web.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;

namespace EmploymentVerification.Web.API
{
    [Route("api/verify-employment")]
    [ApiController]
    public class EmploymentController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public EmploymentController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpPost]
        public IActionResult Get(EmployeeVerificationViewModel employeeVerificationViewModel)
        {
            IList<EmployeeVerificationViewModel> employeeVerificationViewModels = _configuration.GetSection("StaticData").GetSection("EmpInfo").Get<List<EmployeeVerificationViewModel>>();

            if (employeeVerificationViewModels.Where(x => x.EmployeeId == employeeVerificationViewModel.EmployeeId && x.CompanyName == employeeVerificationViewModel.CompanyName && x.VerificationCode == employeeVerificationViewModel.VerificationCode).Count() > 0)
            {
                return Ok(new ApiResponse { Message = "Verified" });
            }
            else if (employeeVerificationViewModels.Where(x => x.EmployeeId == employeeVerificationViewModel.EmployeeId && x.CompanyName == employeeVerificationViewModel.CompanyName).Count() > 0)
            {
                return Ok(new ApiResponse { Message = "Not Verified" });
            }
            else
                return NotFound(new ApiResponse { Message = "Employee Not Exists" });
        }
    }
}