/**
 * 收藏 Hook
 */
import { computed } from 'vue';

import { playMusic } from '@/hooks/MusicHook';
import { usePlayerStore } from '@/store/modules/player';

export function useFavorite() {
  const playerStore = usePlayerStore();

  const isFavorite = computed(() => {
    if (!playMusic.value?.id) return false;
    return playerStore.favoriteList.includes(playMusic.value.id);
  });

  const toggleFavorite = () => {
    if (!playMusic.value?.id) return;
    if (isFavorite.value) {
      playerStore.removeFromFavorite(playMusic.value.id);
    } else {
      playerStore.addToFavorite(playMusic.value.id);
    }
  };

  return {
    isFavorite,
    toggleFavorite
  };
}
