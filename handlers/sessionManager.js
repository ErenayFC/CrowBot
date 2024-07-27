const db = require('erenaydb');

const fetchSession = async (userId) => {
  return await db.fetch(`session_${userId}`) || { messages: [], pages: [], currentPage: 0 };
};

const setSession = async (userId, sessionData) => {
  await db.set(`session_${userId}`, sessionData);
};

const clearSession = async (userId) => {
  await db.delete(`session_${userId}`);
};

module.exports = {
  fetchSession,
  setSession,
  clearSession,
};