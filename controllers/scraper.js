const axios = require('axios');
const cheerio = require('cheerio');

const URL = process.env.SCRAP_DATA; 

const mockData = [
    {
        "title": "Hello Baby",
        "creator": "Enjelicious",
        "genre": "Romance",
        "description": "Gwen is a kind and passionate young woman who faces a tragic backstory, including the death of her mother and mistreatment by her stepmother and stepsister. After a breakup, her father encourages her to go on a cruise vacation with her best friend. On this vacation, she meets Arthur, a handsome but lonely young man, and they share a connection through their unfortunate fates. They end up hooking up, but Gwen runs away, fearful of the consequences. Two years later, fate brings them back together, leading to a legal battle when Arthur discovers he has a child with Gwen. Will they be able to resolve their differences and build a family together?",
        "views": "50 million",
        "image": "https://animemangatoon.com/wp-content/uploads/2024/09/Screenshot-2024-09-16-123040-750x375.webp"
    },
    {
        "title": "The Alpha King’s Claim",
        "creator": "JMFelic",
        "genre": "Romance",
        "description": "Serena, a young woman, finds herself transported to a realm inhabited by supernatural creatures after purchasing an intriguing painting during a rainy day. When she touches the painting at home, she is magically transported to a world of werewolves, where she ends up in the bed of Aero, the Alpha King who harbors a deep hatred for women. This unexpected twist leads to an exciting and dangerous adventure filled with romance, intrigue, and the struggle to gain Aero's acceptance.",
        "views": "60 million",
        "image": "https://animemangatoon.com/wp-content/uploads/2024/09/Screenshot-2024-09-16-123400-750x375.webp"
    },
    {
        "title": "Bitten Contract",
        "creator": "Sungeun",
        "genre": "Romance",
        "description": "Chae-i, an actress who has faced immense pressure and struggles in the entertainment industry, begins experiencing debilitating headaches that affect her professional life. After a chance encounter with Ijun, a top actor who is revealed to be a vampire, her headaches miraculously disappear following his bite. Intrigued by this unusual relationship, Chae-i proposes a deal for Ijun to keep biting her to alleviate her pain, leading to a complicated contractual relationship filled with unexpected twists and revelations.",
        "views": "55 million",
        "image": "https://animemangatoon.com/wp-content/uploads/2024/09/Screenshot-2024-09-16-123400-750x375.webp"
    },
    {
        "title": "Tricked into Becoming the Heroine’s Stepmother",
        "creator": "Hariheen",
        "genre": "Fantasy",
        "description": "Daisy, a strong-willed woman, finds herself waking up in the novel she had written after dying in the real world. As she navigates this new life, she quickly realizes her living conditions remain grim, and her fate intertwines with her characters. When she is wrongfully arrested by the duke’s soldier for helping a friend, she must confront her fears and utilize her creativity to survive in a story where she must take on the role of the heroine’s stepmother, amidst the chaos and challenges of her new existence.",
        "views": "52 million",
        "image": "https://animemangatoon.com/wp-content/uploads/2024/09/Screenshot-2024-09-16-123040-750x375.webp"
    },
    {
        "title": "The Guy Upstairs",
        "creator": "Hanza Art",
        "genre": "Thriller",
        "description": "Rosy, a college undergraduate and orphan, struggles to make ends meet by taking odd jobs. Her life becomes complicated when she starts hearing eerie sounds from the floor above her apartment. One day, she decides to investigate for her peace of mind, only to stumble upon a chilling scene—a dead body of a woman being dragged by her neighbor. As Rosy delves deeper into the mystery, she uncovers dark secrets that threaten her safety and sanity, leading to a thrilling confrontation.",
        "views": "51 million",
        "image": "https://animemangatoon.com/wp-content/uploads/2024/09/Screenshot-2024-09-16-123400-750x375.webp"
    },
    {
        "title": "The Runaway",
        "creator": "Domi, Nokdu",
        "genre": "Romance",
        "description": "Set in the enchanting city of Paris, Jian, a young woman in the fashion industry, unexpectedly crosses paths with her handsome boss, who happens to be her former romantic interest from a previous trip to France. As she navigates the complexities of their professional relationship, Jian discovers that her boss has not forgotten her and that their past is far from over. Amidst the challenges of rekindling an old flame and the chaos of new acquaintances, including a charming gay couple next door, Jian must confront her feelings and decide what she truly wants.",
        "views": "50 million",
        "image": "https://animemangatoon.com/wp-content/uploads/2024/09/Screenshot-2024-09-16-123400-750x375.webp"
    },
    {
        "title": "Your Smile Is A Trap",
        "creator": "Aengo",
        "genre": "Romance",
        "description": "Kiyo, an ex-idol trainee, longs for a normal teenage life after leaving the spotlight. To hide his exceptional looks, he moves in with his grandmother and enrolls in a new school, donning unattractive glasses. There, he meets Lily, a girl who, like him, faces judgment due to her appearance. Initially falling into the same trap of superficial judgments, Kiyo soon realizes the truth about Lily's kind-hearted nature. Their friendship blossoms into a romantic connection as they confront the challenges of societal perceptions and their own insecurities.",
        "views": "53 million",
        "image": "https://animemangatoon.com/wp-content/uploads/2024/09/Screenshot-2024-09-16-123040-750x375.webp"
    },
    {
        "title": "There Must Be Happy Endings",
        "creator": "Jaerim, Bulsa, Flada",
        "genre": "Romance",
        "description": "Yeonu, a beautiful young woman, finds herself in a loveless marriage with Seonjae, a cold businessman. After a series of unfortunate events lead to their divorce, Yeonu is devastated when Seonjae dies suddenly. However, fate intervenes, giving her a second chance to change their past. Determined to save him and mend their broken relationship, she uncovers hidden secrets about Seonjae that challenge everything she thought she knew. Will she succeed in rewriting their destiny and finding true happiness?",
        "views": "54 million",
        "image": "https://animemangatoon.com/wp-content/uploads/2024/09/Screenshot-2024-09-16-123040-750x375.webp"
    },
    {
        "title": "Seasons of Blossom",
        "creator": "HONGDUCK, NEMONE",
        "genre": "Romance",
        "description": "This popular webtoon features a collection of interconnected stories set across the four seasons: spring, summer, fall, and winter. Each season presents a unique narrative, focusing on various themes, including the impact of school bullying. Despite the light-hearted school setting, the stories explore serious issues and the profound effects they have on the lives of the characters involved. As the tales unfold, readers witness how each narrative intersects with the others, creating a rich tapestry of emotion and growth.",
        "views": "58 million",
        "image": "https://animemangatoon.com/wp-content/uploads/2024/09/Screenshot-2024-09-16-123040-750x375.webp"
    },
    {
        "title": "Romance 101",
        "creator": "Namsoo",
        "genre": "Romance",
        "description": "Bareum is a highly organized student who meticulously documents every detail of her life. Despite her academic success, she struggles to find love. To break her pattern, she decides to join a programming club, stepping out of her comfort zone. As she juggles her busy schedule with this new endeavor, Bareum encounters unexpected challenges and heartwarming moments that teach her about love, spontaneity, and the importance of following her heart.",
        "views": "50 million",
        "image": "https://animemangatoon.com/wp-content/uploads/2024/09/Screenshot-2024-09-16-123400-750x375.webp"
    }
];



async function scrapeWebtoons(req, res) {
    try {
        return res.status(200).json(mockData);
    } catch (error) {
        console.error('Error scraping data:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

async function scarpToonDetails(req,res) {
    try {
        let params=req.params;
        
        const toonDetail=mockData.find((ele,idx)=>parseInt(params.id)==idx)
        // console.log(toonDetail)
        return res.status(200).json(toonDetail);
    } catch (error) {
        console.error('Error scraping data:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}


module.exports = {
    scrapeWebtoons,
    scarpToonDetails
};
