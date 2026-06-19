<template>
  <div
    class="artist-detail-page h-full w-full bg-white dark:bg-neutral-900 transition-colors duration-500"
  >
    <n-scrollbar ref="scrollbarRef" class="h-full">
      <div class="artist-detail-content w-full pb-32">
        <!-- Loading State -->
        <div v-if="loading" class="artist-content">
          <!-- Hero Skeleton -->
          <div class="hero-section relative h-[400px] overflow-hidden rounded-tl-2xl">
            <div class="hero-bg absolute inset-0 -top-20">
              <div class="absolute inset-0 skeleton-shimmer" />
            </div>
            <div class="hero-content relative z-10 px-4 pb-6 pt-4 md:px-8 md:pt-8">
              <div class="flex flex-col items-center gap-6 md:flex-row md:items-end md:gap-10">
                <div
                  class="h-36 w-36 md:h-48 md:w-48 skeleton-shimmer rounded-full flex-shrink-0"
                />
                <div class="flex-1 space-y-4 text-center md:text-left">
                  <div class="h-6 w-20 skeleton-shimmer rounded-full" />
                  <div class="h-10 w-1/2 md:h-12 skeleton-shimmer rounded-xl" />
                  <div class="flex justify-center gap-4 md:justify-start">
                    <div class="h-6 w-24 skeleton-shimmer rounded-lg" />
                    <div class="h-6 w-24 skeleton-shimmer rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Content Skeleton -->
          <div class="mt-8 page-padding-x">
            <div class="space-y-4">
              <div v-for="i in 8" :key="i" class="flex items-center gap-4">
                <div class="h-12 w-12 skeleton-shimmer rounded-xl flex-shrink-0" />
                <div class="flex-1 space-y-2">
                  <div class="h-4 w-1/3 skeleton-shimmer rounded-lg" />
                  <div class="h-3 w-1/4 skeleton-shimmer rounded-lg" />
                </div>
                <div class="h-8 w-8 skeleton-shimmer rounded-full flex-shrink-0" />
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div v-else-if="artistInfo" class="artist-content">
          <!-- Hero Section -->
          <section class="hero-section relative overflow-hidden overflow-hidden rounded-tl-2xl">
            <!-- Background Image with Blur -->
            <div class="hero-bg absolute inset-0 -top-20">
              <div
                class="absolute inset-0 bg-cover bg-center scale-110 blur-2xl opacity-40 dark:opacity-30"
                :style="{
                  backgroundImage: `url(${getImgUrl(artistInfo.cover || artistInfo.picUrl, '800y800')})`
                }"
              />
              <div
                class="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white dark:via-neutral-900/80 dark:to-neutral-900"
              />
            </div>

            <!-- Hero Content -->
            <div class="hero-content relative z-10 page-padding-x pt-4 md:pt-8 pb-6">
              <div class="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-end">
                <!-- Artist Avatar -->
                <div class="artist-avatar-wrapper relative group">
                  <div
                    class="avatar-glow absolute -inset-2 rounded-full bg-gradient-to-br from-primary/30 via-primary/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div
                    class="avatar-container relative w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden shadow-2xl ring-4 ring-white/50 dark:ring-neutral-800/50"
                  >
                    <img
                      :src="getImgUrl(artistInfo.cover || artistInfo.picUrl, '500y500')"
                      :alt="artistInfo.name"
                      class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <!-- Play overlay on avatar -->
                    <div
                      class="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all duration-300"
                    >
                      <div
                        class="play-icon w-14 h-14 rounded-full bg-white/90 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-xl cursor-pointer hover:scale-110 active:scale-95"
                        @click="handlePlayAll"
                      >
                        <i class="iconfont icon-playfill text-2xl text-neutral-900 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Artist Info -->
                <div class="artist-info flex-1 text-center md:text-left">
                  <div class="artist-badge mb-2 md:mb-3">
                    <span
                      class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-color)]/10 dark:bg-[var(--accent-color)]/20 text-[var(--accent-color)] text-xs font-semibold uppercase tracking-wider"
                    >
                      <i class="iconfont icon-verified text-sm" />
                      Artist
                    </span>
                  </div>
                  <h1
                    ref="titleElRef"
                    class="artist-name text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight"
                  >
                    {{ artistInfo.name }}
                  </h1>

                  <!-- Stats -->
                  <div
                    class="artist-stats flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 mt-4 md:mt-5"
                  >
                    <div v-if="artistInfo.musicSize" class="stat-item flex items-center gap-2">
                      <i class="iconfont icon-music text-[var(--accent-color)] text-lg" />
                      <span class="text-sm font-medium text-neutral-600 dark:text-neutral-300">
                        <span class="font-bold text-neutral-900 dark:text-white">{{
                          artistInfo.musicSize
                        }}</span>
                        {{ t('artist.hotSongs') }}
                      </span>
                    </div>
                    <div v-if="artistInfo.albumSize" class="stat-item flex items-center gap-2">
                      <i class="iconfont icon-album text-[var(--accent-color)] text-lg" />
                      <span class="text-sm font-medium text-neutral-600 dark:text-neutral-300">
                        <span class="font-bold text-neutral-900 dark:text-white">{{
                          artistInfo.albumSize
                        }}</span>
                        {{ t('artist.albums') }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Action Bar -->
          <section
            class="action-bar sticky top-0 z-20 page-padding-x py-3 md:py-4 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-b border-neutral-100 dark:border-neutral-800/50"
          >
            <div class="flex items-center justify-between gap-3">
              <!-- Left Actions -->
              <div class="flex items-center gap-2 md:gap-3">
                <!-- Play All Button -->
                <button
                  class="play-all-btn flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-[var(--accent-color)] hover:bg-[var(--accent-color)]/90 text-white font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-primary/25"
                  @click="handlePlayAll"
                >
                  <i class="iconfont icon-playfill text-lg" />
                  <span class="hidden sm:inline">{{ t('comp.musicList.playAll') }}</span>
                </button>

                <!-- Add to Playlist Button -->
                <button
                  class="add-btn flex items-center justify-center w-10 h-10 md:w-auto md:h-auto md:px-4 md:py-2.5 rounded-full md:rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 font-medium text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                  @click="addToPlaylist"
                >
                  <i class="iconfont icon-add text-lg" />
                  <span class="hidden md:inline ml-2">{{ t('comp.musicList.addToPlaylist') }}</span>
                </button>
              </div>

              <!-- Right Actions -->
              <div class="flex items-center gap-2">
                <!-- Search Toggle -->
                <button
                  v-if="activeTab === 'songs'"
                  class="action-btn w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
                  :class="
                    isSearchVisible
                      ? 'bg-[var(--accent-color)]/10 dark:bg-[var(--accent-color)]/20 text-[var(--accent-color)]'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  "
                  @click="isSearchVisible ? closeSearch() : showSearch()"
                >
                  <i class="iconfont" :class="isSearchVisible ? 'icon-close' : 'icon-search'" />
                </button>

                <!-- Layout Toggle (Desktop only) -->
                <button
                  v-if="activeTab === 'songs' && !isMobile"
                  class="action-btn w-10 h-10 rounded-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-200 hover:scale-105 active:scale-95"
                  :title="
                    isCompactLayout
                      ? t('comp.musicList.switchToNormal')
                      : t('comp.musicList.switchToCompact')
                  "
                  @click="toggleLayout"
                >
                  <i class="iconfont" :class="isCompactLayout ? 'icon-list' : 'icon-menu'" />
                </button>
              </div>
            </div>

            <!-- Search Input (Expandable) -->
            <Transition name="search-slide">
              <div v-if="isSearchVisible && activeTab === 'songs'" class="search-container mt-3">
                <div
                  class="relative flex items-center bg-neutral-100 dark:bg-neutral-800 rounded-xl overflow-hidden"
                >
                  <i class="iconfont icon-search text-neutral-400 dark:text-neutral-500 ml-4" />
                  <input
                    v-model="searchKeyword"
                    type="text"
                    :placeholder="t('comp.musicList.searchSongs')"
                    class="flex-1 px-3 py-2.5 bg-transparent text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 outline-none"
                    @blur="handleSearchBlur"
                  />
                  <button
                    v-if="searchKeyword"
                    class="px-3 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                    @click="searchKeyword = ''"
                  >
                    <i class="iconfont icon-close text-sm" />
                  </button>
                </div>
              </div>
            </Transition>
          </section>

          <!-- Tab Navigation -->
          <section class="tab-nav page-padding-x pt-4 md:pt-6">
            <div
              class="tab-list relative flex gap-1 p-1 bg-neutral-100 dark:bg-neutral-800/50 rounded-xl w-fit"
            >
              <button
                v-for="tab in tabs"
                :key="tab.value"
                class="tab-item relative px-4 md:px-6 py-2 md:py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                :class="
                  activeTab === tab.value
                    ? 'text-neutral-900 dark:text-white'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
                "
                @click="activeTab = tab.value"
              >
                <span class="relative z-10">{{ tab.label }}</span>
                <!-- Active indicator -->
                <Transition name="tab-indicator">
                  <div
                    v-if="activeTab === tab.value"
                    class="absolute inset-0 bg-white dark:bg-neutral-700 rounded-lg shadow-sm"
                  />
                </Transition>
              </button>
            </div>
          </section>

          <!-- Tab Content -->
          <section class="tab-content page-padding-x py-6 md:py-8">
            <!-- Songs Tab -->
            <div v-show="activeTab === 'songs'" class="songs-tab">
              <!-- No Results -->
              <div
                v-if="filteredSongs.length === 0 && searchKeyword"
                class="empty-state flex flex-col items-center justify-center py-16"
              >
                <i
                  class="iconfont icon-search text-5xl text-neutral-300 dark:text-neutral-600 mb-4"
                />
                <p class="text-neutral-500 dark:text-neutral-400">
                  {{ t('comp.musicList.noSearchResults') }}
                </p>
              </div>

              <!-- Song List with CSS optimization -->
              <div v-else class="song-list" :class="{ 'compact-mode': isCompactLayout }">
                <div
                  v-for="(song, index) in filteredSongs"
                  :key="song.id"
                  class="song-item-container"
                >
                  <song-item
                    :item="formatSong(song)"
                    :compact="isCompactLayout"
                    :index="index"
                    @play="handlePlay(song)"
                  />
                </div>
              </div>

              <!-- Load More Trigger -->
              <div ref="songsLoadMoreRef" class="load-more-trigger py-8">
                <div v-if="songLoading" class="flex items-center justify-center gap-2">
                  <div
                    class="w-5 h-5 border-2 border-[var(--accent-color)]/30 border-t-primary rounded-full animate-spin"
                  />
                  <span class="text-sm text-neutral-400 dark:text-neutral-500">{{
                    t('common.loading') || 'Loading...'
                  }}</span>
                </div>
                <div
                  v-else-if="!songPage.hasMore && songs.length > 0"
                  class="text-center text-sm text-neutral-400 dark:text-neutral-500"
                >
                  鈥?{{ t('common.noMore') || 'No more' }} 鈥?                </div>
              </div>
            </div>

            <!-- Albums Tab -->
            <div v-show="activeTab === 'albums'" class="albums-tab">
              <!-- Album Grid -->
              <div
                v-if="albums.length > 0"
                class="album-grid grid grid-cols-2 gap-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
              >
                <div
                  v-for="(album, index) in albums"
                  :key="album.id"
                  class="album-card group cursor-pointer"
                  :style="{ animationDelay: calculateAnimationDelay(index, 0.03) }"
                  @click="handleAlbumClick(album)"
                >
                  <!-- Cover -->
                  <div
                    class="album-cover relative aspect-square overflow-hidden rounded-2xl shadow-lg"
                  >
                    <img
                      :src="getImgUrl(album.picUrl, '500y500')"
                      :alt="album.name"
                      class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <!-- Play Overlay -->
                    <div
                      class="play-overlay absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 group-hover:bg-black/20 group-hover:opacity-100 transition-all duration-300"
                    >
                      <div
                        class="play-icon w-12 h-12 rounded-full bg-white/90 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300 shadow-xl"
                      >
                        <i class="iconfont icon-playfill text-xl text-neutral-900 ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <!-- Info -->
                  <div class="album-info mt-3">
                    <h3
                      class="album-name line-clamp-2 text-sm font-semibold text-neutral-800 dark:text-neutral-100 group-hover:text-[var(--accent-color)] dark:group-hover:text-[var(--accent-color)] transition-colors"
                    >
                      {{ album.name }}
                    </h3>
                    <p class="album-date mt-1 text-xs text-neutral-400 dark:text-neutral-500">
                      {{ formatPublishTime(album.publishTime) }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Load More Trigger -->
              <div ref="albumsLoadMoreRef" class="load-more-trigger py-8">
                <div v-if="albumLoading" class="flex items-center justify-center gap-2">
                  <div
                    class="w-5 h-5 border-2 border-[var(--accent-color)]/30 border-t-primary rounded-full animate-spin"
                  />
                  <span class="text-sm text-neutral-400 dark:text-neutral-500">{{
                    t('common.loading') || 'Loading...'
                  }}</span>
                </div>
                <div
                  v-else-if="!albumPage.hasMore && albums.length > 0"
                  class="text-center text-sm text-neutral-400 dark:text-neutral-500"
                >
                  鈥?{{ t('common.noMore') || 'No more' }} 鈥?                </div>
              </div>
            </div>

            <!-- About Tab -->
            <div v-show="activeTab === 'about'" class="about-tab">
              <div class="about-content">
                <h2
                  class="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mb-4 md:mb-6"
                >
                  {{ t('artist.description') }}
                </h2>
                <div
                  v-if="artistInfo.briefDesc"
                  class="prose prose-neutral dark:prose-invert max-w-none"
                >
                  <p
                    class="text-sm md:text-base leading-relaxed text-neutral-600 dark:text-neutral-300 whitespace-pre-line"
                  >
                    {{ artistInfo.briefDesc }}
                  </p>
                </div>
                <div
                  v-else
                  class="empty-state flex flex-col items-center justify-center py-16 text-neutral-400 dark:text-neutral-500"
                >
                  <i class="iconfont icon-info text-5xl mb-4 opacity-50" />
                  <p>{{ t('common.noData') || 'No description available' }}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Empty State (No Artist) -->
        <div
          v-else
          class="empty-state flex flex-col items-center justify-center min-h-[60vh] text-neutral-400 dark:text-neutral-500"
        >
          <i class="iconfont icon-user text-6xl mb-4 opacity-30" />
          <p>{{ t('common.noData') || 'Artist not found' }}</p>
        </div>
      </div>
    </n-scrollbar>

    <!-- Bottom Player Spacer -->
    <play-bottom />
  </div>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core';
import { NScrollbar, useMessage } from 'naive-ui';
import PinyinMatch from 'pinyin-match';
import {
  computed,
  nextTick,
  onActivated,
  onDeactivated,
  onMounted,
  onUnmounted,
  ref,
  watch
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import { getArtistAlbums, getArtistDetail, getArtistTopSongs } from '@/api/artist';
import { getMusicDetail } from '@/api/music';
import { navigateToMusicList } from '@/components/common/MusicListNavigator';
import PlayBottom from '@/components/common/PlayBottom.vue';
import SongItem from '@/components/common/SongItem.vue';
import { useScrollTitle } from '@/hooks/useScrollTitle';
import router from '@/router';
import { usePlayerStore } from '@/store';
import { IArtist } from '@/types/artist';
import { calculateAnimationDelay, getImgUrl, isMobile } from '@/utils';

defineOptions({
  name: 'ArtistDetail'
});

const { t } = useI18n();
const route = useRoute();
const playerStore = usePlayerStore();
const message = useMessage();

const artistId = computed(() => Number(route.params.id));
const activeTab = ref('songs');

const scrollbarRef = ref<any>(null);

// Tab configuration
const tabs = computed(() => [
  { value: 'songs', label: t('artist.hotSongs') },
  { value: 'albums', label: t('artist.albums') },
  { value: 'about', label: t('artist.description') }
]);

// 姝屾墜淇℃伅
const artistInfo = ref<IArtist>();
const songs = ref<any[]>([]);
const albums = ref<any[]>([]);

const titleElRef = ref<HTMLElement | null>(null);
const artistTitle = computed(() => artistInfo.value?.name ?? '');
useScrollTitle(artistTitle, titleElRef);

// 鍔犺浇鐘舵€?const loading = ref(false);
const songLoading = ref(false);
const albumLoading = ref(false);

// 鍒嗛〉鍙傛暟
const songPage = ref({
  page: 1,
  pageSize: 30,
  hasMore: true
});

const albumPage = ref({
  page: 1,
  pageSize: 30,
  hasMore: true
});

// 鏃犻檺婊氬姩寮曠敤
const songsLoadMoreRef = ref<HTMLElement | null>(null);
const albumsLoadMoreRef = ref<HTMLElement | null>(null);
let songsObserver: IntersectionObserver | null = null;
let albumsObserver: IntersectionObserver | null = null;

// 娣诲姞涓婁竴涓狪D鐨勫紩鐢紝鐢ㄤ簬姣旇緝
const previousId = ref<string | null>(null);

// 绠€鍖栫紦瀛樻満鍒?const artistDataCache = new Map();

// 鍗曚釜缂撳瓨閿嚱鏁?const getCacheKey = (id: string | number) => `artist_${id}`;

// 鎼滅储鍜屽竷灞€鐩稿叧
const searchKeyword = ref('');
const isSearchVisible = ref(false);
const isCompactLayout = ref(
  isMobile.value ? false : localStorage.getItem('musicListLayout') === 'compact'
);

// 瀵艰埅鍒颁笓杈戣鎯?const handleAlbumClick = async (album: any) => {
  try {
    navigateToMusicList(router, {
      id: album.id,
      type: 'album',
      name: album.name,
      listInfo: {
        ...album,
        coverImgUrl: album.picUrl
      },
      canRemove: false
    });
  } catch (error) {
    console.error('Failed to navigate to album:', error);
    message.error(t('common.loadFailed'));
  }
};

// 鍔犺浇姝屾墜淇℃伅
const loadArtistInfo = async () => {
  if (!artistId.value) return;

  // 婊氬姩鍒伴《閮?  nextTick(() => {
    scrollbarRef.value?.scrollTo(0, 0);
  });

  // 绠€鍖栫紦瀛樻鏌?  const cacheKey = getCacheKey(artistId.value);
  if (artistDataCache.has(cacheKey)) {
    console.log('浣跨敤缂撳瓨鏁版嵁');
    const cachedData = artistDataCache.get(cacheKey);
    artistInfo.value = cachedData.artistInfo;
    songs.value = cachedData.songs;
    albums.value = cachedData.albums;
    songPage.value = cachedData.songPage;
    albumPage.value = cachedData.albumPage;
    return;
  }

  // 鍔犺浇鏂版暟鎹?  loading.value = true;
  try {
    const info = await getArtistDetail(artistId.value);
    if (info.data?.data?.artist) {
      artistInfo.value = info.data.data.artist;
    }
    // 閲嶇疆鍒嗛〉骞跺姞杞藉垵濮嬫暟鎹?    resetPagination();
    await Promise.all([loadSongs(), loadAlbums()]);

    // 淇濆瓨鍒扮紦瀛?    artistDataCache.set(cacheKey, {
      artistInfo: artistInfo.value,
      songs: [...songs.value],
      albums: [...albums.value],
      songPage: { ...songPage.value },
      albumPage: { ...albumPage.value }
    });
  } catch (error) {
    console.error('鍔犺浇姝屾墜淇℃伅澶辫触:', error);
  } finally {
    loading.value = false;
  }
};

// 閲嶇疆鍒嗛〉
const resetPagination = () => {
  songPage.value = {
    page: 1,
    pageSize: 50,
    hasMore: true
  };
  albumPage.value = {
    page: 1,
    pageSize: 50,
    hasMore: true
  };
  songs.value = [];
  albums.value = [];
};

// 鍔犺浇姝屾洸
const loadSongs = async () => {
  if (!artistId.value || !songPage.value.hasMore || songLoading.value) return;

  try {
    songLoading.value = true;
    const { page, pageSize } = songPage.value;
    const res = await getArtistTopSongs({
      id: artistId.value,
      limit: pageSize,
      offset: (page - 1) * pageSize
    });

    const ids = res.data.songs.map((item) => item.id);
    const songsDetail = await getMusicDetail(ids);

    if (songsDetail.data?.songs) {
      const newSongs = songsDetail.data.songs.map((item) => {
        return {
          ...item,
          picUrl: item.al.picUrl,
          song: {
            artists: item.ar,
            name: item.name,
            id: item.id
          }
        };
      });
      songs.value = page === 1 ? newSongs : [...songs.value, ...newSongs];
      songPage.value.hasMore = newSongs.length === pageSize;
      songPage.value.page++;
    } else {
      songPage.value.hasMore = false;
    }
  } catch (error) {
    console.error('鍔犺浇姝屾洸澶辫触:', error);
  } finally {
    songLoading.value = false;
  }
};

// 鍔犺浇涓撹緫
const loadAlbums = async () => {
  if (!artistId.value || !albumPage.value.hasMore || albumLoading.value) return;

  try {
    albumLoading.value = true;
    const { page, pageSize } = albumPage.value;
    const res = await getArtistAlbums({
      id: artistId.value,
      limit: pageSize,
      offset: (page - 1) * pageSize
    });

    if (res.data?.hotAlbums) {
      const newAlbums = res.data.hotAlbums;
      albums.value = page === 1 ? newAlbums : [...albums.value, ...newAlbums];
      albumPage.value.hasMore = newAlbums.length === pageSize;
      albumPage.value.page++;
    } else {
      albumPage.value.hasMore = false;
    }
  } catch (error) {
    console.error('鍔犺浇涓撹緫澶辫触:', error);
  } finally {
    albumLoading.value = false;
  }
};

// 鏍煎紡鍖栧彂甯冩椂闂?const formatPublishTime = (time: number) => {
  return useDateFormat(time, 'YYYY-MM-DD').value;
};

// 鎼滅储鐩稿叧鏂规硶
const showSearch = () => {
  isSearchVisible.value = true;
  // 娣诲姞涓€涓皬寤惰繜鍚庤仛鐒︽悳绱㈡
  nextTick(() => {
    const inputEl = document.querySelector('.search-container input');
    if (inputEl) {
      (inputEl as HTMLInputElement).focus();
    }
  });
};

const closeSearch = () => {
  isSearchVisible.value = false;
  searchKeyword.value = '';
};

const handleSearchBlur = () => {
  // 濡傛灉鎼滅储妗嗕负绌猴紝鍒欏湪澶辩劍鏃跺叧闂悳绱㈡
  if (!searchKeyword.value) {
    setTimeout(() => {
      isSearchVisible.value = false;
    }, 200);
  }
};

// 杩囨护姝屾洸鍒楄〃
const filteredSongs = computed(() => {
  if (!searchKeyword.value) {
    return songs.value;
  }

  const keyword = searchKeyword.value.toLowerCase().trim();
  return songs.value.filter((song) => {
    const songName = song.name?.toLowerCase() || '';
    const albumName = song.al?.name?.toLowerCase() || '';
    const artists = song.ar || song.artists || [];

    // 鍘熷鏂囨湰鍖归厤
    const nameMatch = songName.includes(keyword);
    const albumMatch = albumName.includes(keyword);
    const artistsMatch = artists.some((artist: any) => {
      return artist.name?.toLowerCase().includes(keyword);
    });

    // 鎷奸煶鍖归厤
    const namePinyinMatch = song.name && PinyinMatch.match(song.name, keyword);
    const albumPinyinMatch = song.al?.name && PinyinMatch.match(song.al.name, keyword);
    const artistsPinyinMatch = artists.some((artist: any) => {
      return artist.name && PinyinMatch.match(artist.name, keyword);
    });

    return (
      nameMatch ||
      albumMatch ||
      artistsMatch ||
      namePinyinMatch ||
      albumPinyinMatch ||
      artistsPinyinMatch
    );
  });
});

// 甯冨眬鍒囨崲
const toggleLayout = () => {
  isCompactLayout.value = !isCompactLayout.value;
  localStorage.setItem('musicListLayout', isCompactLayout.value ? 'compact' : 'normal');
};

// 鎾斁鍏ㄩ儴
const handlePlayAll = () => {
  if (filteredSongs.value.length === 0) return;

  playerStore.setPlayList(
    filteredSongs.value.map((song) => ({
      ...song,
      picUrl: song.al.picUrl
    }))
  );

  // 寮€濮嬫挱鏀剧涓€棣?  playerStore.setPlay(filteredSongs.value[0]);

  message.success(t('comp.musicList.playAll'));
};

// 娣诲姞鍒版挱鏀惧垪琛?const addToPlaylist = () => {
  if (filteredSongs.value.length === 0) return;

  // 鑾峰彇褰撳墠鎾斁鍒楄〃
  const currentList = playerStore.playList;

  // 娣诲姞姝屾洸鍒版挱鏀惧垪琛?閬垮厤閲嶅娣诲姞)
  const newSongs = filteredSongs.value.filter(
    (song) => !currentList.some((item) => item.id === song.id)
  );

  if (newSongs.length === 0) {
    message.info(t('comp.musicList.songsAlreadyInPlaylist'));
    return;
  }

  // 鍚堝苟鍒板綋鍓嶆挱鏀惧垪琛ㄦ湯灏?  const newList = [
    ...currentList,
    ...newSongs.map((song) => ({
      ...song,
      picUrl: song.al.picUrl
    }))
  ];

  playerStore.setPlayList(newList);

  message.success(t('comp.musicList.addToPlaylistSuccess', { count: newSongs.length }));
};

const handlePlay = (song?: any) => {
  // 濡傛灉浼犲叆浜嗙壒瀹氭瓕鏇诧紙鐐瑰嚮鍗曟洸鎾斁锛夛紝鍒欏皢鍏朵綔涓烘挱鏀惧垪琛ㄧ殑绗竴棣?  if (song) {
    const songList = [...filteredSongs.value];
    const index = songList.findIndex((item) => item.id === song.id);

    if (index !== -1) {
      // 灏嗙偣鍑荤殑姝屾洸绉诲埌绗竴浣?      const clickedSong = songList.splice(index, 1)[0];
      songList.unshift(clickedSong);
    }

    playerStore.setPlayList(
      songList.map((item) => ({
        ...item,
        picUrl: item.al?.picUrl || item.picUrl
      }))
    );

    // 璁剧疆褰撳墠鎾斁姝屾洸
    playerStore.setPlay(song);
  } else {
    // 榛樿琛屼负锛氭挱鏀炬暣涓繃婊ゅ悗鐨勫垪琛?    playerStore.setPlayList(
      filteredSongs.value.map((item) => ({
        ...item,
        picUrl: item.al?.picUrl || item.picUrl
      }))
    );
  }
};

// 绠€鍖栬瀵熷櫒璁剧疆
const setupObservers = () => {
  // 娓呯悊涔嬪墠鐨勮瀵熷櫒
  if (songsObserver) songsObserver.disconnect();
  if (albumsObserver) albumsObserver.disconnect();

  // 鍒涘缓瑙傚療鍣?濡傛灉涓嶅瓨鍦?
  if (!songsObserver) {
    songsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && songPage.value.hasMore) {
          loadSongs();
        }
      },
      { threshold: 0.1 }
    );
  }

  if (!albumsObserver) {
    albumsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && albumPage.value.hasMore) {
          loadAlbums();
        }
      },
      { threshold: 0.1 }
    );
  }

  // 瑙傚療褰撳墠鏍囩椤电殑鍏冪礌
  nextTick(() => {
    if (activeTab.value === 'songs' && songsLoadMoreRef.value) {
      songsObserver?.observe(songsLoadMoreRef.value);
    } else if (activeTab.value === 'albums' && albumsLoadMoreRef.value) {
      albumsObserver?.observe(albumsLoadMoreRef.value);
    }
  });
};

// 鐩戝惉鏍囩鍒囨崲
watch(activeTab, () => {
  setupObservers();
});

// 鐩戝惉寮曠敤鍏冪礌鐨勫彉鍖?watch([songsLoadMoreRef, albumsLoadMoreRef], () => {
  setupObservers();
});

// 鎼滅储璇嶅彉鍖栨椂閲嶆柊璁剧疆瑙傚療鍣?watch(searchKeyword, () => {
  nextTick(() => {
    setupObservers();
  });
});

onActivated(() => {
  // 纭繚褰撳墠璺敱鏄壓鏈璇︽儏椤?  if (route.name === 'artistDetail') {
    const currentId = route.params.id as string;

    // 婊氬姩鍒伴《閮?    nextTick(() => {
      scrollbarRef.value?.scrollTo(0, 0);
    });

    // 棣栨鍔犺浇鎴朓D鍙樺寲鏃跺姞杞芥暟鎹?    if (!previousId.value || previousId.value !== currentId) {
      console.log('ID宸插彉鍖栵紝鍔犺浇鏂版暟鎹?);
      previousId.value = currentId;
      activeTab.value = 'songs';
      loadArtistInfo();
    }

    // 閲嶆柊璁剧疆瑙傚療鍣?    setupObservers();
  }
});

onMounted(() => {
  // 棣栨鎸傝浇鏃跺姞杞芥暟鎹?  if (route.params.id) {
    previousId.value = route.params.id as string;
    loadArtistInfo();
    setupObservers();
  }
});

onDeactivated(() => {
  // 鏂紑瑙傚療鍣ㄤ絾涓嶆竻闄ゅ紩鐢?  if (songsObserver) songsObserver.disconnect();
  if (albumsObserver) albumsObserver.disconnect();
});

onUnmounted(() => {
  // 瀹屽叏娓呯悊瑙傚療鍣?  if (songsObserver) {
    songsObserver.disconnect();
    songsObserver = null;
  }
  if (albumsObserver) {
    albumsObserver.disconnect();
    albumsObserver = null;
  }
});

// 鏍煎紡鍖栨瓕鏇诧紙浣跨敤鍦ㄥ垪琛ㄤ腑锛?const formatSong = (item: any) => {
  if (!item) {
    return null;
  }
  return {
    ...item,
    picUrl: item.al?.picUrl || item.picUrl
  };
};
</script>

<style lang="scss" scoped>
/* Artist Detail Page Styles */
.artist-detail-page {
  position: relative;
}

/* Hero Section */
.hero-section {
  min-height: 200px;
}

/* Action Bar Sticky Behavior */
.action-bar {
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
}

/* Tab Indicator Animation */
.tab-item {
  z-index: 1;
}

.tab-item > div {
  z-index: -1;
}

.tab-indicator-enter-active,
.tab-indicator-leave-active {
  transition: all 0.2s ease;
}

.tab-indicator-enter-from,
.tab-indicator-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Search Slide Animation */
.search-slide-enter-active,
.search-slide-leave-active {
  transition: all 0.25s ease;
}

.search-slide-enter-from,
.search-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
  max-height: 0;
  margin-top: 0;
}

.search-slide-enter-to,
.search-slide-leave-from {
  max-height: 60px;
}

/* Virtual Song List */
.virtual-song-list {
  @apply w-full;
}

.song-list {
  @apply w-full;
}

/* CSS-based virtualization for performance */
.song-item-container {
  content-visibility: auto;
  contain-intrinsic-size: 0 72px; /* 棰勪及楂樺害锛岄槻姝㈠竷灞€鎶栧姩 */
}

/* Compact layout - smaller item height */
.song-list.compact-mode .song-item-container {
  contain-intrinsic-size: 0 52px;
}

/* Album Card Animation */
.album-card {
  animation: fadeInUp 0.4s ease backwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Loading Spinner */
.loading-spinner {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* Hover Effects */
.album-cover {
  transition: box-shadow 0.3s ease;
}

.album-card:hover .album-cover {
  @apply shadow-2xl shadow-primary/10;
}

/* Mobile Optimizations */
@media (max-width: 768px) {
  .hero-section {
    min-height: auto;
  }

  .action-bar {
    @apply py-2;
  }

  .tab-list {
    @apply w-full;
  }

  .tab-item {
    @apply flex-1 text-center;
  }
}

/* Focus states for accessibility */
button:focus-visible {
  @apply outline-none ring-2 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-neutral-900;
}

input:focus-visible {
  @apply outline-none ring-2 ring-primary/50;
}
</style>

