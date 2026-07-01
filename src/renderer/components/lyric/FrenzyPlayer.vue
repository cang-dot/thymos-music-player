<template>
  <div v-if="isVisible" class="frenzy-player" ref="playerRef">
    <!-- 关闭按钮 -->
    <div class="frenzy-player__close" @click="closePlayer">
      <i class="ri-arrow-down-s-line"></i>
    </div>

    <!-- 设置按钮 -->
    <div class="frenzy-player__settings">
      <div class="frenzy-player__settings-btn" @click="toggleSettings">
        <i class="ri-settings-3-line"></i>
      </div>
    </div>

    <!-- 设置面板 Teleport 到 body 避免 z-index 问题 -->
    <Teleport to="body">
      <div v-if="showSettings" class="frenzy-settings-overlay" @click.self="showSettings = false">
        <div class="frenzy-settings-panel">
          <lyric-settings />
        </div>
      </div>
    </Teleport>

    <!-- 背景层：白色故障效果 -->
    <GlitchBackground
      baseColor="#ffffff"
      accentColor="#d0d0d0"
      :intensity="glitchIntensity"
      :speed="0.8"
      :showScanlines="config.frenzyShowScanlines !== false"
    />

    <!-- 歌词层 -->
    <div class="frenzy-player__lyrics">
      <FrenzyLyrics
        :lyrics="lyrics"
        :currentTime="currentTime"
      />
    </div>

  </div>
</template>

<script setup lang="ts">
/**
 * FrenzyPlayer - 狂躁模式主组件（初稿设计）
 *
 * 白色背景 + 轻微故障效果 + 黑色可拉伸文字 + 红色正常文字 + 无 GSAP 动效
 */
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

import GlitchBackground from './GlitchBackground.vue';
import FrenzyLyrics from './FrenzyLyrics.vue';
import LyricSettings from './LyricSettings.vue';
import { useStyleEngineStore } from '@/store/modules/styleEngine';
import { useCommunityDataStore } from '@/store/modules/communityData';
import { DEFAULT_LYRIC_CONFIG, type LyricConfig } from '@/types/lyric';
import { nowTime } from '@/hooks/MusicHook';
import { usePlayerStore } from '@/store/modules/player';
import { setCurrentSongId } from '@/utils/emotionalDetector';

const props = defineProps({
  modelValue: { type: Boolean, default: false }
});

const emit = defineEmits(['update:modelValue']);

const isVisible = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v)
});

function closePlayer() {
  isVisible.value = false;
}

const showSettings = ref(false);
function toggleSettings() {
  showSettings.value = !showSettings.value;
}

const styleEngine = useStyleEngineStore();
const communityData = useCommunityDataStore();
const playerStore = usePlayerStore();

const playerRef = ref<HTMLElement | null>(null);
const config = ref<LyricConfig>({ ...DEFAULT_LYRIC_CONFIG });

// 从 localStorage 读取配置
function loadConfig() {
  const saved = localStorage.getItem('music-full-config');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      config.value = { ...DEFAULT_LYRIC_CONFIG, ...parsed };
    } catch {
      config.value = { ...DEFAULT_LYRIC_CONFIG };
    }
  }
}

loadConfig();

// 监听配置变化
function handleConfigUpdate() {
  loadConfig();
}

// 同步当前歌曲 ID 到情感词检测器，并加载副歌数据
watch(() => playerStore.currentSong?.id, (songId) => {
  console.log('[FrenzyPlayer] watch songId:', songId);
  if (songId) {
    setCurrentSongId(String(songId));
    styleEngine.loadClimaxData(String(songId));
  }
}, { immediate: true });

onMounted(() => {
  window.addEventListener('music-full-config-updated', handleConfigUpdate);

  styleEngine.syncFromPlayerStore();
  styleEngine.syncCoverColors();

  if (playerStore.currentSong?.id) {
    console.log('[FrenzyPlayer] onMounted loading songId:', playerStore.currentSong.id);
    styleEngine.loadClimaxData(String(playerStore.currentSong.id));
  }
});

onUnmounted(() => {
  window.removeEventListener('music-full-config-updated', handleConfigUpdate);
  communityData.clear();
  console.log('[FrenzyPlayer] onUnmounted, communityData cleared');
});

// 歌词数据
const lyrics = computed(() => {
  const song = playerStore.currentSong;
  if (!song?.lyric?.lrcArray) return [];
  return song.lyric.lrcArray;
});

// 当前播放时间
const currentTime = computed(() => nowTime.value);

// 故障强度（根据能量级别动态调整，基础值较低）
const glitchIntensity = computed(() => {
  const baseIntensity = config.value.frenzyGlitchIntensity;
  const energyBoost = styleEngine.energyLevel * 0.15;
  return Math.min(0.6, baseIntensity + energyBoost);
});
</script>

<style scoped>
.frenzy-player {
  position: fixed;
  inset: 0;
  z-index: 9998;
  overflow: hidden;
  background: #ffffff;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.frenzy-player__close {
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 9999;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(8px);
  cursor: pointer;
  transition: background 0.2s ease;
  color: #1a1a1a;
  font-size: 24px;
}

.frenzy-player__close:hover {
  background: rgba(0, 0, 0, 0.12);
}

.frenzy-player__settings {
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 9999;
}

.frenzy-player__settings-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(8px);
  cursor: pointer;
  transition: background 0.2s ease;
  color: #1a1a1a;
  font-size: 24px;
}

.frenzy-player__settings-btn:hover {
  background: rgba(0, 0, 0, 0.12);
}

.frenzy-player__lyrics {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  pointer-events: none;
}
</style>

<style>
.frenzy-settings-overlay {
  position: fixed;
  inset: 0;
  z-index: 10001;
}
.frenzy-settings-panel {
  position: fixed;
  top: 72px;
  right: 24px;
  z-index: 10001;
}
</style>
