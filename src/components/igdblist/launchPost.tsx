import { useRouter } from 'next/navigation';

export function launchPost(slug: string) {

    const router = useRouter();
    try {
        router.push(`/game/${slug}`);
    } catch (error) {
        console.error(error);
    }


}