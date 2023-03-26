using Newtonsoft.Json;

namespace net7backend.requests
{
    public class IBSDiagnosisRequest
    {
        public int UserId { get; set; }
        public Dictionary<string, double> InputContributionMapJson { get; set; } =
            new Dictionary<string, double>();
    }
}
