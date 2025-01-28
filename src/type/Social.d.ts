type Social = {
  provider: SocialProvider
  content: string;
};

type SocialProvider = 'youtube'
| 'instagram'
| 'github'
| 'linkedin';
