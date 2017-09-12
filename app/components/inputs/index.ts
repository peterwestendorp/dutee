import { DatabaseService } from '../../services/databaseService';

export interface InputConfig {
  id: string;
  label: string;
  databaseService: DatabaseService;
}