import Video1 from '../../assets/videos/video1.mp4'; 
import Video2 from '../../assets/videos/video2.mp4'; 
import Video3 from '../../assets/videos/video3.mp4'; 
import Reel1 from '../../assets/videos/reel1.mp4'; 
import Reel2 from '../../assets/videos/reel2.mp4'; 
import Reel3 from '../../assets/videos/reel3.mp4'; 
import Reel4 from '../../assets/videos/reel4.mp4'; 
import Thumbnail1 from '../../assets/images/video_thumbnails/videoThumbnail1.png';
import Thumbnail2 from '../../assets/images/video_thumbnails/videoThumbnail2.png';
import Thumbnail3 from '../../assets/images/video_thumbnails/videoThumbnail3.png';
import reelThumbnail1 from '../../assets/images/video_thumbnails/reelThumbnail1.png';
import reelThumbnail2 from '../../assets/images/video_thumbnails/reelThumbnail2.png';
import reelThumbnail3 from '../../assets/images/video_thumbnails/reelThumbnail3.png';
import reelThumbnail4 from '../../assets/images/video_thumbnails/reelThumbnail4.png';

export const shortsData = [
    {
      id: '1',
      thumbnail: reelThumbnail1,
      title: 'Social Stories Explained',
      views: '10K views',
      videoUrl: Reel1,
    },
    {
      id: '2',
      thumbnail: reelThumbnail2,
      title: 'Healthy habits always brush you teeth',
      views: '20K views',
      videoUrl: Reel2,
    },
    {
      id: '3',
      thumbnail: reelThumbnail3,
      title: 'Communication Skills',
      views: '15K views',
      videoUrl: Reel3,
    },
    {
      id: '4',
      thumbnail: reelThumbnail4,
      title: 'Healthy habits wash hands before eating',
      views: '25K views',
      videoUrl: Reel4,
    },
    {
      id: '7',
      thumbnail: { uri: 'https://images.pexels.com/photos/29276537/pexels-photo-29276537.jpeg' },
      title: 'Top 5 F1 Tracks',
      views: '98K views',
      videoUrl: 'https://videos.pexels.com/video-files/4830364/4830364-uhd_1440_2732_25fps.mp4',
    },
    {
      id: '8',
      thumbnail: { uri: 'https://images.pexels.com/photos/8342281/pexels-photo-8342281.jpeg' },
      title: 'The Classroom of the Future',
      views: '204K views',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    },
  ];
  
  export const videoListData = [
    {
      id: '1',
      thumbnail: Thumbnail1,
      title: 'Personal Space Exploration | Social Stories',
      channel: 'Local Channel',
      views: '50K views',
      date: '1 day ago',
      videoUrl: Video1,
    },
    {
      id: '2',
      thumbnail: Thumbnail2, 
      title: 'I feel Angry | Social Stories',
      channel: 'Local Channel',
      views: '32K views',
      date: '1 day ago',
      videoUrl: Video2,
    },
    {
      id: '3',
      thumbnail: Thumbnail3, 
      title: 'No Spitting | Social Stories',
      channel: 'Local Channel',
      views: '43K views',
      date: '1 day ago',
      videoUrl: Video3,
    },
    {
      id: '4',
      thumbnail: { uri: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg' }, // Use object with uri key
      title: 'Playlist make you feel like a boss | Gentleman songs',
      channel: 'Dark Blues Music',
      views: '170K views',
      date: '2 weeks ago',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    },
    {
      id: '5',
      thumbnail: { uri: 'https://images.pexels.com/photos/8173471/pexels-photo-8173471.jpeg' }, // Use object with uri key
      title: 'Legs Workout Easy | Episode 01',
      channel: 'Gym Bros',
      views: '210K views',
      date: '1 week ago',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      id: '6',
      thumbnail: { uri: 'https://images.pexels.com/photos/12795/pexels-photo-12795.jpeg' }, // Use object with uri key
      title: 'Everything you should know about F1',
      channel: 'Dark Blues Music',
      views: '170K views',
      date: '2 weeks ago',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    },
  ];
  