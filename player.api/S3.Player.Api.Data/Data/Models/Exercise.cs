/*
Crucible
Copyright 2020 Carnegie Mellon University.
NO WARRANTY. THIS CARNEGIE MELLON UNIVERSITY AND SOFTWARE ENGINEERING INSTITUTE MATERIAL IS FURNISHED ON AN "AS-IS" BASIS. CARNEGIE MELLON UNIVERSITY MAKES NO WARRANTIES OF ANY KIND, EITHER EXPRESSED OR IMPLIED, AS TO ANY MATTER INCLUDING, BUT NOT LIMITED TO, WARRANTY OF FITNESS FOR PURPOSE OR MERCHANTABILITY, EXCLUSIVITY, OR RESULTS OBTAINED FROM USE OF THE MATERIAL. CARNEGIE MELLON UNIVERSITY DOES NOT MAKE ANY WARRANTY OF ANY KIND WITH RESPECT TO FREEDOM FROM PATENT, TRADEMARK, OR COPYRIGHT INFRINGEMENT.
Released under a MIT (SEI)-style license, please see license.txt or contact permission@sei.cmu.edu for full terms.
[DISTRIBUTION STATEMENT A] This material has been approved for public release and unlimited distribution.  Please see Copyright notice for non-US Government use and distribution.
Carnegie Mellon� and CERT� are registered in the U.S. Patent and Trademark Office by Carnegie Mellon University.
DM20-0181
*/

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace S3.Player.Api.Data.Data.Models
{
    public class ExerciseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public ExerciseStatus Status { get; set; }

        public virtual ICollection<TeamEntity> Teams { get; set; } = new List<TeamEntity>();
        public virtual ICollection<ApplicationEntity> Applications { get; set; } = new List<ApplicationEntity>();        
        public virtual ICollection<ExerciseMembershipEntity> Memberships { get; set; } = new List<ExerciseMembershipEntity>();

        public ExerciseEntity Clone()
        {
            var entity = this.MemberwiseClone() as ExerciseEntity;
            entity.Id = Guid.Empty;
            entity.Teams = new List<TeamEntity>();
            entity.Applications = new List<ApplicationEntity>();
            entity.Memberships = new List<ExerciseMembershipEntity>();

            return entity;
        }
    }

    public enum ExerciseStatus
    {
        Active = 0,
        Inactive = 1
    }
}

