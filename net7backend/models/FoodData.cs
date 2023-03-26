using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace net7backend.Models
{
    [Table("fooddata")]
    public class FoodData
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
        [Column("food_id")]
        public string FoodId { get; set; }

        [Required]
        [Column("food_name")]
        public string FoodName { get; set; }

        [Column("timestamp")]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime Timestamp { get; set; }
    }
}
