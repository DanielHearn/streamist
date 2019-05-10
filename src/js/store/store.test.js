import { mutations } from './store'
import { defaultData } from './../config'

const { setSmallInterface, setTopStreams } = mutations

test('set smallInterface to true', () => {
  const state = defaultData

  setSmallInterface(state, true)

  expect(state.smallInterface).toBe(true)
})

test('set smallInterface to false', () => {
  const state = defaultData

  setSmallInterface(state, false)

  expect(state.smallInterface).toBe(false)
})

test('set topStreams', () => {
  const topStreams = [
    {
      id: '34057836560',
      user_id: '36029255',
      user_name: 'Riot Games',
      game_id: '21779',
      community_ids: ['ad14d4fc-1a7c-413f-aa32-4906ef3669ae'],
      type: 'live',
      title: 'MSI Groups: G2 Esports vs. SK telecom T1',
      viewer_count: 159654,
      started_at: '2019-05-10T08:30:02Z',
      language: 'en',
      thumbnail_url:
        'https://static-cdn.jtvnw.net/previews-ttv/live_user_riotgames-{width}x{height}.jpg',
      tag_ids: ['6ea6bca4-4712-4ab9-a906-e3336a9d8039'],
      thumbnail:
        'https://static-cdn.jtvnw.net/previews-ttv/live_user_riotgames-480x270.jpg',
      clean_username: 'riotgames',
      url: 'https://twitch.tv/riotgames',
      game_name: 'League of Legends'
    },
    {
      id: '34058057440',
      user_id: '190835892',
      user_name: 'LCK_Korea',
      game_id: '21779',
      community_ids: [],
      type: 'live',
      title: 'Group Stage Day 1 | 2019 Mid-Season Invitational',
      viewer_count: 70705,
      started_at: '2019-05-10T09:20:21Z',
      language: 'ko',
      thumbnail_url:
        'https://static-cdn.jtvnw.net/previews-ttv/live_user_lck_korea-{width}x{height}.jpg',
      tag_ids: ['ab2975e3-b9ca-4b1a-a93e-fb61a5d5c3a4'],
      thumbnail:
        'https://static-cdn.jtvnw.net/previews-ttv/live_user_lck_korea-480x270.jpg',
      clean_username: 'lck_korea',
      url: 'https://twitch.tv/lck_korea',
      game_name: 'League of Legends'
    }
  ]
  const state = defaultData

  setTopStreams(state, topStreams)

  expect(state.topStreams).toBe(topStreams)
})
