import React from 'react'
import { assets } from '../../../assets/assessts';
import MobileBlogCards from '../../../components/cards/MobileBlogCards';

interface BlogPost {
  image: string;
  title: string;
  excerpt: string;
  authorInitials: string;
  authorName: string;
}

const MobileHome = () => {
    const blogPosts: BlogPost[] = [
      {
        image: assets.news1,
        title: 'Ronaldo Set to Marry Georgina After 2026 World Cup',
        excerpt: 'Soccer legend Cristiano Ronaldo has confirmed that his long-time partner Georgina Rodríguez said “yes” to his proposal this August.',
        authorInitials: 'JS',
        authorName: 'John Smith',
      },
      {
        image: assets.news2 || assets.news1,
        title: 'Elon Musk Announces Mars Mission Launch in 2026',
        excerpt: 'SpaceX to send first crewed mission to Mars with reusable Starship. Historic step toward multi-planetary civilization.',
        authorInitials: 'AM',
        authorName: 'Alex Morgan',
      },
      {
        image: assets.news3 || assets.news1,
        title: 'New COVID Variant Detected in South Africa',
        excerpt: 'Health officials monitor new strain with increased transmissibility. WHO calls emergency meeting to assess global risk.',
        authorInitials: 'TD',
        authorName: 'Tina Davis',
      },
      {
        image: assets.news1,
        title: 'Bitcoin Hits $100,000 Milestone for First Time',
        excerpt: 'Cryptocurrency surges past historic mark as institutional adoption grows. Analysts predict $150K by year-end.',
        authorInitials: 'MK',
        authorName: 'Mike King',
      },
      {
        image: assets.news2 || assets.news1,
        title: 'Taylor Swift Announces Surprise Album Drop',
        excerpt: 'Pop superstar releases 11th studio album at midnight. Fans flood streaming platforms, breaking records within hours.',
        authorInitials: 'LJ',
        authorName: 'Lisa Johnson',
      },
      {
        image: assets.news3 || assets.news1,
        title: 'Scientists Discover Water on Exoplanet K2-18b',
        excerpt: 'James Webb Telescope confirms liquid water and organic compounds on distant world, fueling hopes of alien life.',
        authorInitials: 'RP',
        authorName: 'Robert Park',
      },
    ];

    return (
        <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory">
            {
                blogPosts.map((post, index) => (
                    <div key={index} className="h-screen snap-start">
                        <MobileBlogCards 
                            {...post}
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default MobileHome