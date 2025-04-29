export interface AnymalData {
  _docID: string;
  id: string;
  name: string;
  dateOfBirth: string;
  petType: string;
  breed: string[];
  lifestage: string;
  passportID: string;
  profileImageUrl: string;
  petAndOwnerImageUrl: string;
  gender: string;
  weightLbs: number;
  temp_docID: string | null;
  caregiverId: string;
  caregiverNearId: string;
  source: string;
  sourceId: string;
  timeAddedUtc: number;
  timeUpdatedUtc: number;
}
