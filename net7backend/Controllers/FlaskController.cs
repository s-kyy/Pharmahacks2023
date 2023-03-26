using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using net7backend.Models;
using net7backend.requests;
using Newtonsoft.Json;

namespace net7backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FlaskController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<FlaskController> _logger;
        private readonly AppDbContext _context;

        private readonly string _flaskUrl;

        public FlaskController(
            HttpClient httpClient,
            AppDbContext context,
            ILogger<FlaskController> logger,
            IConfiguration configuration
        )
        {
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _flaskUrl =
                configuration.GetSection("FlaskApi")["BaseAddress"]
                ?? throw new Exception("FlaskApi:BaseAddress is not set in appsettings.json");
        }

        // [HttpPost]
        // public async Task<IActionResult> PostAsync([FromBody] DiagnosisInputData input)
        // {
        //     var json = JsonConvert.SerializeObject(input);
        //     var content = new StringContent(json, Encoding.UTF8, "application/json");

        //     var response = await _httpClient.PostAsync(_flaskUrl + "api/diagnosis", content);

        //     if (!response.IsSuccessStatusCode)
        //     {
        //         return StatusCode((int)response.StatusCode, response.ReasonPhrase);
        //     }

        //     var resultJson = await response.Content.ReadAsStringAsync();
        //     var result = JsonConvert.DeserializeObject<double[]>(resultJson);

        //     return Ok(result);
        // }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] IBSDiagnosisRequest input)
        {
            // var json = JsonConvert.SerializeObject(input);
            // var content = new StringContent(json, Encoding.UTF8, "application/json");

            // var response = await _httpClient.PostAsync(_flaskUrl + "api/diagnosis", content);

            // if (!response.IsSuccessStatusCode)
            // {
            //     return StatusCode((int)response.StatusCode, response.ReasonPhrase);
            // }

            // var resultJson = await response.Content.ReadAsStringAsync();
            // var result = JsonConvert.DeserializeObject<double[]>(resultJson);

            var result = _context.PredictedContributions.First();
            result.InputContributionMapJson = input.InputContributionMapJson;

            return Ok(result);
        }
    }
}
