import { useState, useEffect } from 'react';

interface PersistentFormOptions<T> {
  key: string;
  defaultValues: T;
  onLoad?: (data: T) => void;
  onError?: (error: Error) => void;
}

export function usePersistentForm<T extends Record<string, any>>({
  key,
  defaultValues,
  onLoad,
  onError
}: PersistentFormOptions<T>) {
  // Initialize state with saved data if available, otherwise use defaults
  const getInitialState = (): T => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log(`[${key}] Loaded from localStorage:`, parsed);
        return parsed;
      }
    } catch (error) {
      console.error(`[${key}] Error loading initial state:`, error);
      onError?.(error instanceof Error ? error : new Error('Failed to load saved data'));
    }
    return defaultValues;
  };

  const [formData, setFormData] = useState<T>(getInitialState);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (isInitialized) return; // Prevent double-loading

    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log(`[${key}] Loaded from localStorage on mount:`, parsed);
        setFormData(parsed);
        onLoad?.(parsed);
      }
    } catch (error) {
      console.error(`[${key}] Error loading saved form data:`, error);
      onError?.(error instanceof Error ? error : new Error('Failed to load saved data'));
    } finally {
      setIsInitialized(true);
    }
  }, [key, onLoad, onError, isInitialized]);

  // Save to localStorage on any change
  useEffect(() => {
    if (!isInitialized) return; // Don't save during initialization

    try {
      console.log(`[${key}] Saving to localStorage:`, formData);
      localStorage.setItem(key, JSON.stringify(formData));
    } catch (error) {
      console.error(`[${key}] Error saving form data:`, error);
      onError?.(error instanceof Error ? error : new Error('Failed to save data'));
    }
  }, [key, formData, onError, isInitialized]);

  const resetForm = () => {
    console.log(`[${key}] Resetting form to defaults:`, defaultValues);
    setFormData(defaultValues);
    localStorage.removeItem(key);
  };

  return {
    formData,
    setFormData,
    resetForm
  };
} 