interface BungieTokenResponse {
  acess_token: string;
  token_type: string;
  expires_in: number;
  membership_id: string;
}

module.exports = {
    BungieTokenResponse,
}