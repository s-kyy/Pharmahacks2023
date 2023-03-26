using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace net7backend.Models
{
    [Table("predictedcontributions")]
    public class PredictedContribution
    {
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [Column("user_id")]
        [ForeignKey("User")]
        public int UserId { get; set; }

        [Required]
        [Column("predicted_contribution")]
        public decimal PredictedContributionValue { get; set; }

        [Required]
        [Column("recommendation_message")]
        public string RecommendationMessage { get; set; }

        [Required]
        [Column("food_contribution_map", TypeName = "jsonb")]
        public Dictionary<string, double> FoodContributionMapJson { get; set; }

        [Required]
        [Column("input_contribution_map", TypeName = "jsonb")]
        public Dictionary<string, double> InputContributionMapJson { get; set; }

        [Column("timestamp")]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime Timestamp { get; set; }
    }
}
