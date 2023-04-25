import moment from 'moment';
import {Tag} from '@chakra-ui/react';


const TimeTag = (props) => {
    const date = moment(props.data);
    const duration = moment.duration(moment().diff(date));
  
    let timeAgo = '';
  
    if (duration.asSeconds() < 60) {
      // less than a minute ago
      timeAgo = Math.floor(duration.asSeconds()) + 's';
    } else if (duration.asMinutes() < 60) {
      // less than an hour ago
      timeAgo = Math.floor(duration.asMinutes()) + 'm';
    } else if (duration.asHours() < 24) {
      // less than a day ago
      timeAgo = Math.floor(duration.asHours()) + 'h';
    } else {
      // more than a day ago
      const days = Math.floor(duration.asDays());
      const hours = Math.floor(duration.asHours() - days * 24);
      const minutes = Math.floor(duration.asMinutes() - days * 24 * 60 - hours * 60);
  
      if (days > 0) {
        timeAgo = days + 'd ' + hours + 'h';
      } else if (hours > 0) {
        timeAgo = hours + 'h ' + minutes + 'm';
      } else {
        timeAgo = minutes + 'm';
      }
    }

    return (
        <Tag variant='outline'>{timeAgo}</Tag>
    );
}

export default TimeTag;
