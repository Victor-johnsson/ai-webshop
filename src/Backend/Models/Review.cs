using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Review
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        [Range(1,5)]
        public int Rating { get; set; }
        [Required]
        public string Comment { get; set; } = string.Empty;
        public DateTime Date { get; set; } = DateTime.UtcNow;
    }
}
