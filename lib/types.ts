
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  sessionId: string;
}

export interface ChatSession {
  id: string;
  sessionId: string;
  title: string | null;
  status: 'active' | 'completed' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  messages: ChatMessage[];
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: 'new' | 'responded' | 'archived';
  createdAt: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface StreamingChatResponse {
  content: string;
  isComplete: boolean;
}

export interface LLMMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ConsultationConfig {
  maxMessages: number;
  maxTokens: number;
  temperature: number;
  model: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  autoSave: boolean;
}

export interface Equipment {
  id: string;
  name: string;
  category: 'audio' | 'video' | 'accessory';
  brand: string;
  model: string;
  price: number;
  description: string;
  features: string[];
  imageUrl?: string;
}

export interface Recommendation {
  id: string;
  equipment: Equipment;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  alternativeOptions?: Equipment[];
}
