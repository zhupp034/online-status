
// 客户端类型
export enum ClientType {
    'null' = -1,
    'flash',
    'H5' = 2,
    'PC' = 11,
    'PAD' = 21,
    'Android' = 31,
    'IOS'
  }

  export enum RoleIdMap {
    'teacher' = 101,
    'student' = 100,
    'educational' = 104, // 教务
    'commissionerOfEducation' = 109, // 教育局长
    'record' = 110,
    'support' = 110,
    'assist' = 113, // 助教
  
    'master' = 100001, // 主持人
    'participant', // 参会人
    'audience' // 旁听
  }
/**
 * personType 3位(000: 101, 001 : 1, 010 : 2,011: 3, 100: 4, 101: 5, 110: 6)
 * @param status
 * @return 异常类型为学生类型
 */
export function getPersonType(status: number): number {
    const value = (status >> 11) & 7
    if (value >= 1 && value <= 6) {
      return value
    } else if (value === 0) {
      return 1
    }
    return 2
  }
  
  // 获取客户端类型
  export function getClientType(status: number): number {
    const value = (status >> 7) & 3
    if (value === 1) {
      //01 桌面端
      return ClientType.PC
    } else if (value === 2) {
      //10 pad端
      return ClientType.PAD
    } else if (value === 3) {
      //11 phone端
      return 31
    } else {
      //00 flash端，11暂时没用到
      return ClientType.flash
    }
  }
  
  export function formatUserStatus(status: number) {
    const isHandUp = !!((status >> 2) & 1)
    const isTalking = !!(status & 8)
    const personPermission = !!((status >> 3) & 1)
    const personType = getPersonType(status)
    const connecting = !!((status >> 14) & 1) // 连线状态
    const banned = !!((status >> 15) & 1) // 禁言状态
    const videoInvite = !!((status >> 16) & 1) // 视频邀请状态
    return {
      isHandUp,
      isTalking,
      personPermission,
      personType,
      connecting,
      banned,
      videoInvite
      // mode
    }
  }
  
  // 获取权限状态，音视频，黑板
  function formatPermissionStatus(status: number) {
    return {
      canAudio: !!(status & 1), // 001
      canVideo: !!(status & 2), // 010
      canDraw: !!(status & 4) // 100
    }
  }
  
  enum UerInfoEnum {
    userId,
    status,
    videoUrl,
    audioUrl,
    personType,
    userName = 6,
    online,
    clientType,
    permissionType = 9,
    avatar,
    other
  }
  
  function transNull(val) {
    return val === 'null' ? '' : val
  }
  
  export function formatUser(item: any[], option?: { isMeeting?: boolean }) {
    const userStatusObj = formatUserStatus(item[UerInfoEnum.status])
  
    const status = {
      userId: item[UerInfoEnum.userId],
      status: item[UerInfoEnum.status],
      videoUrl: transNull(item[UerInfoEnum.videoUrl]),
      audioUrl: transNull(item[UerInfoEnum.audioUrl]),
      userName: item[UerInfoEnum.userName],
      avatar:
        item[UerInfoEnum.avatar],
      online: item[UerInfoEnum.online],
      clientType: item[UerInfoEnum.clientType],
      ...userStatusObj,
      ...formatPermissionStatus(item[UerInfoEnum.permissionType]),
      roleId: item[UerInfoEnum.other]?.roleId
    }
    let sort = 0
    if (option?.isMeeting) {
      sort =
        (status.isHandUp ? 1000 : 0) +
        (status.canAudio ? 10000 : 0) +
        (status.canVideo ? 100000 : 0) +
        // (status.isTalking ? 100 : 0) +
        (status.online ? 10 : 0) +
        (status.roleId === RoleIdMap.audience ? 0 : 1) +
        (status.personPermission ? 0.1 : 0)
    } else {
      sort =
        (status.isHandUp ? 100000 : 0) +
        (status.canAudio ? 10000 : 0) +
        (status.canVideo ? 1000 : 0) +
        // (status.isTalking ? 100 : 0) +
        (status.online ? 10 : 0)
    }
  
    return {
      ...status,
      sort
    }
  }