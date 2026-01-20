import { formatDistanceToNow, format } from 'date-fns';

export const formatTimeSince = (timestamp) => {
  if (!timestamp) return 'Never';
  try {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  } catch{
    return 'Invalid date';
  }
};

export const formatDateTime = (timestamp) => {
  if (!timestamp) return 'N/A';
  try {
    return format(new Date(timestamp), 'PPpp');
  } catch {
    return 'Invalid date';
  }
};

export const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A';
  try {
    return format(new Date(timestamp), 'PP');
  } catch  {
    return 'Invalid date';
  }
};

