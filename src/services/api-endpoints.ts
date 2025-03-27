// const API_URL = 'http://localhost:3000/';
const API_URL = 'https://bright-mouse-93.telebit.io/';
// const API_URL = 'https://d208-203-109-66-87.ngrok-free.app/';

const api = {
  authentication: {
    tokengenerate: `${API_URL}tokengenerate`,
    existingdatafetch: `${API_URL}Existingdatafetch/`,
    register: `${API_URL}Userregister`,
    checkusername: `${API_URL}checkUsername`,
    userinterest: `${API_URL}Userinterest`,
    userphoto: `${API_URL}Userphoto`,
    profilebio: `${API_URL}profile_Bio`,
    userlanguage: `${API_URL}UserLanguage`,
    profilevisibility: `${API_URL}profilevisibility`,
    Userthumb: `${API_URL}Userthumb`,
    allUserProfile: `${API_URL}alluserprofile`,
    displayreport: `${API_URL}displayreport`,
    report: `${API_URL}report`,
    ShowBlockprofile: `${API_URL}ShowBlockprofile`,
    userblock: `${API_URL}userblock`,
    User_Unblock: `${API_URL}User_Unblock`,
    is_like_dislike: `${API_URL}is_like_dislike`,
    availableforchat: `${API_URL}availableforchat`,
    get_notification: `${API_URL}notification/list/`,
    matches: `${API_URL}matches/`,
    room: `${API_URL}room/`,
    update_profile_in_mybio: `${API_URL}update_profile_in_mybio`,
    filter_value: `${API_URL}filter_value`,
    Userfilter: `${API_URL}Userfilter`,
    generateRequest: `${API_URL}generaterequest`,
    fetch_request: `${API_URL}fetch_request`,
    clean_chat: `${API_URL}clean_chat`,
    mute_unmute: `${API_URL}mute_unmute`,
    all_notification_off: `${API_URL}all_notification_off`,
    delete_user_account: `${API_URL}delete_user_account`,
    gmaillogin: `${API_URL}gmaillogin`,
    selfie_verify: `${API_URL}selfie_verify`,
    notification_count: `${API_URL}notification/messages/`,
    single_user_profile: `${API_URL}single_user_profile`,
  },
};

export default api;
