import http from '@/api/http';

export default async () => {
    const { data } = await http.get(`/api/client/theme`);
    return (data.data || []);
};
