/*
Crucible
Copyright 2020 Carnegie Mellon University.
NO WARRANTY. THIS CARNEGIE MELLON UNIVERSITY AND SOFTWARE ENGINEERING INSTITUTE MATERIAL IS FURNISHED ON AN "AS-IS" BASIS. CARNEGIE MELLON UNIVERSITY MAKES NO WARRANTIES OF ANY KIND, EITHER EXPRESSED OR IMPLIED, AS TO ANY MATTER INCLUDING, BUT NOT LIMITED TO, WARRANTY OF FITNESS FOR PURPOSE OR MERCHANTABILITY, EXCLUSIVITY, OR RESULTS OBTAINED FROM USE OF THE MATERIAL. CARNEGIE MELLON UNIVERSITY DOES NOT MAKE ANY WARRANTY OF ANY KIND WITH RESPECT TO FREEDOM FROM PATENT, TRADEMARK, OR COPYRIGHT INFRINGEMENT.
Released under a MIT (SEI)-style license, please see license.txt or contact permission@sei.cmu.edu for full terms.
[DISTRIBUTION STATEMENT A] This material has been approved for public release and unlimited distribution.  Please see Copyright notice for non-US Government use and distribution.
Carnegie Mellon� and CERT� are registered in the U.S. Patent and Trademark Office by Carnegie Mellon University.
DM20-0181
*/

using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using S3.Player.Api.Data.Data.Models;
using S3.Player.Api.Infrastructure.Authorization;
using S3.Player.Api.Services;
using S3.Player.Api.ViewModels;
using System.Security.Claims;

namespace S3.Player.Api.Infrastructure.Mappings
{
    public class ExerciseProfile : AutoMapper.Profile
    {
        public ExerciseProfile()
        {
            CreateMap<ExerciseEntity, Exercise>()
                .ForMember(dest => dest.CanManage, opt => opt.ResolveUsing<ManageExerciseResolver>());

            CreateMap<Exercise, ExerciseEntity>();
        }
    }

    public class ManageExerciseResolver : IValueResolver<ExerciseEntity, Exercise, bool>
    {
        private IAuthorizationService _authorizationService;
        private ClaimsPrincipal _user;

        public ManageExerciseResolver(IAuthorizationService authorizationService, IUserClaimsService userClaimsService)
        {
            _authorizationService = authorizationService;
            _user = userClaimsService.GetCurrentClaimsPrincipal();
        }

        public bool Resolve(ExerciseEntity source, Exercise destination, bool member, ResolutionContext context)
        {
            return _authorizationService.AuthorizeAsync(_user, null, new ManageExerciseRequirement(source.Id)).Result.Succeeded;
        }
    }
}

