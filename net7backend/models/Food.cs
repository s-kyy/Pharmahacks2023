using System.ComponentModel.DataAnnotations.Schema;

namespace net7backend.Models
{
    [Table("parent_food")]
    public class ParentFood
    {
        [Column("id", TypeName = "varchar(255)")]
        public string Id { get; set; }

        [Column("name", TypeName = "varchar(255)")]
        public string Name { get; set; }
    }

    [Table("child_food")]
    public class ChildFood
    {
        [Column("id", TypeName = "varchar(255)")]
        public string Id { get; set; }

        [Column("name", TypeName = "varchar(255)")]
        public string Name { get; set; }
    }

    [Table("parent_child_association")]
    public class ParentChildAssociation
    {
        [Column("parent_id", TypeName = "varchar(255)")]
        public string ParentId { get; set; }

        [ForeignKey("ParentId")]
        public ParentFood ParentFood { get; set; }

        [Column("child_id", TypeName = "varchar(255)")]
        public string ChildId { get; set; }

        [ForeignKey("ChildId")]
        public ChildFood ChildFood { get; set; }

        public int Id { get; set; }
    }

    public class Food
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }
}
