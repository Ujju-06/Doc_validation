import axios from 'axios'
const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "https://crazycoders1.onrender.com"
).replace(/\/+$/, "");

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 60000,
});

export async function screenDocuments({ documents, documentTypes, personPhoto }) {
  const formData = new FormData()

  documents.forEach((file) => formData.append('documents', file))

  if (documentTypes?.length) {
    formData.append('document_types', documentTypes.join(','))
  }

  if (personPhoto) {
    formData.append('person_photo', personPhoto)
  }

  const res = await api.post('/screen', formData)
  return res.data
}

export async function detectDocumentType(file) {
  const formData = new FormData()
  formData.append('document', file)

  const res = await api.post('/documents/detect', formData)
  return res.data
}

export async function listScreenings(limit = 50) {
  const res = await api.get('/screenings', { params: { limit } })
  return res.data
}

export async function getScreening(id) {
  return (await api.get(`/screenings/${encodeURIComponent(id)}`)).data
}

export async function listDemoScenarios() {
  return (await api.get('/demo/scenarios')).data
}

export async function runDemoScenario(scenarioId) {
  return (await api.post(`/demo/seed/${encodeURIComponent(scenarioId)}`)).data
}

export async function getSystemInfo() {
  return (await api.get('/system/info')).data
}

export default api
