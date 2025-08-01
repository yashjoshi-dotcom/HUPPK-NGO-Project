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
    // {
    //   id: '5',
    //   thumbnail: { uri: 'https://images.pexels.com/photos/29276537/pexels-photo-29276537.jpeg' },
    //   title: 'Top 5 F1 Tracks',
    //   views: '98K views',
    //   videoUrl: 'https://videos.pexels.com/video-files/4830364/4830364-uhd_1440_2732_25fps.mp4',
    // },
    // {
    //   id: '6',
    //   thumbnail: { uri: 'https://images.pexels.com/photos/8342281/pexels-photo-8342281.jpeg' },
    //   title: 'The Classroom of the Future',
    //   views: '204K views',
    //   videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    // },
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
      thumbnail: { uri: 'https://raw.githubusercontent.com/Tanush15/ngo_assets/main/accepting_no.png' }, // Use object with uri key
      title: 'Accepting NO | Emotional regulation social stories',
      channel: 'Social Stories Channel',
      views: '170K views',
      date: '2 weeks ago',
      videoUrl: 'https://raw.githubusercontent.com/Tanush15/ngo_assets/main/Accepting%20NO%20Social%20Story%20Emotional%20regulation%20social%20stories.mp4',
    },
    {
      id: '5',
      thumbnail: { uri: 'https://raw.githubusercontent.com/Tanush15/ngo_assets/main/asking_help.png' }, // Use object with uri key
      title: 'Asking for Help | Social Stories',
      channel: 'Social Stories Channel',
      views: '210K views',
      date: '1 week ago',
      videoUrl: 'https://raw.githubusercontent.com/Tanush15/ngo_assets/main/Asking%20For%20Help%20-%20Scout%20s%20Back-To-School%20Series%20_%20Scout%20s%20Social%20Stories%20_%20Back%20to%20school%20story%20(online-video-cutter.com).mp4',
    },
    {
      id: '6',
      thumbnail: { uri: 'https://raw.githubusercontent.com/Tanush15/ngo_assets/main/no_hitting.png' }, // Use object with uri key
      title: 'No Hitting | Social Stories',
      channel: 'Social Stories Channel',
      views: '170K views',
      date: '2 weeks ago',
      videoUrl: 'https://raw.githubusercontent.com/Tanush15/ngo_assets/main/No%20hitting%20Social%20Story%20(online-video-cutter.com).mp4',
    },
  ];
  