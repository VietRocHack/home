# VietRocHack Website Data

This file provides instructions for updating the content in the VietRocHack website.

## Data Structure

All website content is stored in `/src/data/hackathons.json`. This file contains three main sections:

1. **hackathons** - Information about each hackathon event
2. **team** - Team member profiles
3. **statistics** - Overall team statistics

## How to Update Content

### Adding a New Hackathon

To add a new hackathon, add a new object to the `hackathons` array with the following structure:

```json
{
  "id": "hackathon-name-year",
  "name": "Hackathon Name",
  "year": 2024,
  "date": "Month Year",
  "location": "University/Venue Name",
  "city": "City",
  "state": "State/Province",
  "achievement": "Award or Achievement",
  "description": "Brief description of the hackathon experience",
  "mainImage": "/team/image-path.jpg",
  "website": "https://hackathon-website.com",
  "photos": [
    {
      "src": "/team/photo1.jpg",
      "caption": "Description of the photo",
      "isFeatured": true
    },
    // Add more photos here
  ],
  "projects": [
    {
      "id": "project-name",
      "name": "Project Name",
      "tagline": "Short catchy tagline",
      "description": "Detailed description of the project",
      "thumbnail": "/projects/thumbnail.jpg",
      "demoLink": "https://demo-link.com",
      "githubLink": "https://github.com/vietrochack/project",
      "techStack": ["Technology1", "Technology2", "Technology3"],
      "achievements": ["Award1", "Award2"],
      "teamMembers": ["TeamMember1", "TeamMember2"],
      "screenshots": [
        "/projects/screenshot1.jpg",
        "/projects/screenshot2.jpg"
      ],
      "featured": true
    }
    // Add more projects here
  ]
}
```

### Adding Team Members

To add a new team member, add a new object to the `team` array:

```json
{
  "id": "firstname-lastname",
  "name": "Full Name",
  "role": "Team Role",
  "school": "University Name",
  "major": "Major/Degree Program",
  "graduation": 2025,
  "bio": "Brief bio with personality",
  "photo": "/team/member-photo.jpg",
  "socialLinks": {
    "github": "https://github.com/username",
    "linkedin": "https://linkedin.com/in/username",
    "twitter": "https://twitter.com/username"
  },
  "skills": ["Skill1", "Skill2", "Skill3"]
}
```

### Updating Statistics

To update the overall statistics, modify the values in the `statistics` object:

```json
"statistics": {
  "hackathonsEntered": 7,
  "projectsBuilt": 12,
  "prizesWon": 9,
  "codeLines": 48293,
  "coffeeConsumed": 283,
  "sleepLost": "∞"
}
```

## Images

### Image Directories

- Team photos: `/public/team/`
- Project screenshots and thumbnails: `/public/projects/`

### Image Guidelines

- Use descriptive filenames with the format: `[event]_[year]_[description].jpg`
- Recommended sizes:
  - Team photos: 1200x800px
  - Project thumbnails: 600x400px
  - Project screenshots: 1920x1080px (or 16:9 ratio)
- Optimize images for web before uploading (use tools like ImageOptim)
- Use JPG for photos and PNG for UI screenshots with transparency

## Tips

1. **Keep descriptions concise** - Aim for 1-2 sentences that highlight the most important points.
2. **Use consistent naming** - Follow the same patterns for IDs and file paths across all entries.
3. **Mark featured content** - Set `"featured": true` for projects you want to highlight on the homepage.
4. **Check links** - Ensure all URLs are working and include the full path (including https://).
5. **Include achievements** - Always list awards or recognitions from each hackathon.

## Testing

After updating the data, test the website locally to make sure your changes appear correctly:

```bash
npm run dev
``` 