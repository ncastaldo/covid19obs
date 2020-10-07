# Perspective workflow

[Tweet: TweetID,User,Text,Language,tweetType,ADM0_A3,Timestamp]

- Basic table including number of tweets, users per country [Pandas easy]
*** Please, if you think about additional descriptives that might be relevant in this table for the introduction, add them please.

- Information about the time window for data collection for each country. [Timestamp 1 and N]

- RANDOM SAMPLE 

* Top ten lingue per ogni paese [tot, pct, rank]

- Timeline at a country level including the average level of toxicity per day in each country [Pandas easy]

- Rankings of 1 million most toxic tweets posted in each country [Pandas easy]
*** My idea here is to do a topic analysis of the most toxic tweets in each country and compare the narratives of those with that of the lowest toxic tweets. So could we add here a ranking of the top 1 million tweets with lowest toxic scores?

(mid-term)
- Ranking of 100 most toxic hashtags per country 
	1. Hashtags -> mean of scores
	2. From 1 million -> sum frequency

(short-mid-term)
- Average toxicity associated to tweets mentioning each party, politicians, and media in each country ideally every day or week to depict trends or peaks. (measured by the average toxicity score associated to tweets including those usernames). (Username nella cartella su [Drive](https://drive.google.com/drive/folders/161jjdxulcKKjvr4kj2o5AGc-edxTFznl?usp=sharing), stacked in base al 'media')

(Mentre Filtri tweet rispetto a username dai dati di Drive tieni la label del tipo di media tra quelli su google drive)

(short-mid-term)
- Timeline of average toxicity of tweets including conspiracy-theory related hashtags (see list at the end).
Ranking of most toxic conspiracy-theory related hashtags.

(short-mid-term)
- Timeline of average toxicity of tweets by bots across time to depict trends and peaks.
Ranking of most toxic bots measured by the average toxic score of the tweets posted. 
*** Can we only do the N most toxic ones in each country? Maybe the 100,000 or the 10,000....what is feasible in terms of computational cost?  The point here is to understand moderation policies by Twitter against highly toxic users. So, I guess we do not need all of them but the most toxic should suffice. What do you think? 

(long-term)
(are the most toxic ones suspended or not found?)

