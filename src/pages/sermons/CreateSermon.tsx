import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { SermonForm } from '@/components/sermons/SermonForm';
import { useCreateSermon } from '@/hooks/services/sermons/hook';

export default function CreateSermon() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { mutate: createSermon, isPending } = useCreateSermon();

  const handleSubmit = (data: {
    title: string;
    preacher: string;
    youtubeLink: string;
    description: string;
    status: 'publish' | 'unpublish';
    thumbnailImage: File | null;
  }) => {
    console.log('Received form data:', data);
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('preacher', data.preacher);
    formData.append('link', data.youtubeLink);
    formData.append('description', data.description);
    formData.append('status', data.status);
    if (data.thumbnailImage) {
      formData.append('thumbnail', data.thumbnailImage);
    }

    console.log('FormData status:', formData.get('status'));

    createSermon(formData, {
      onSuccess: () => {
        toast({
          description: 'Sermon created successfully',
        });
        navigate('/sermons');
      },
      onError: error => {
        toast({
          description: error.message || 'Failed to create sermon',
          variant: 'destructive',
        });
      },
    });
  };

  return <SermonForm onSubmit={handleSubmit} isPending={isPending} />;
}
