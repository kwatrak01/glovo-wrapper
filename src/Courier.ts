import { Endpoints, get, IError, put } from './utils/Http';

interface IExelenceScoreInfo {
  message: string | null;
  score: string | null;
  title: string;
  version: number;
}

interface IPhoneNumber {
  countryCode: string;
  number: string;
}

interface IProfileHeader {
  excellenceScore: string | null;
  excellenceScoreDescription: string | null;
  hideExcellenceScore: boolean;
  imageUrl: string;
  isCertified: boolean;
  message: string;
  performanceTitle: string;
  showCourierRating: boolean;
  showExcellenceScoreV4: boolean;
}

interface IChallengeSection {
  title: string;
  challenges: IChallenge[];
}

interface IChallenge {
  chipText: string | null;
  description: string;
  expiration: string;
  iconId: string;
  id: number;
  period: string;
  style: string;
  title: string;
  warningIconId: string | null;
}

interface IActiveDelivery {
  cashBalance: string;
  dedicatedSlot: string | null;
  emptyDeliveryReason: IEmptyDeliveryReason;
  hideSelfReassignedDeliveries: boolean;
  inCoolOff: boolean;
  isLastReassignment: boolean;
  nextSlot: string | null;
  nextSlotSelfKickOutNotStarted: string | null;
  remainingCoolOffDuration: number;
  totalCoolOffDuration: number;
}

interface IEmptyDeliveryReason {
  bookingStatus: string;
  description: string;
  label: string | null;
  title: string;
}

interface IDeliverySummary {
  earnings: string;
  id: number | null;
}

interface IRaport {
  id: number;
  title: string;
  current: boolean;
  totalEarnings: string;
}

interface ICalendarDay {
  date: number;
  name: string;
  slots: ICalendarSlot[];
  zoneVersion: number;
}

interface ICalendarSlot {
  duration: number;
  endTime: number;
  id: number;
  isInProgress: boolean;
  isUnbookable: boolean;
  startTime: number;
  status: string;
  tags: ICalendarSlotTag[];
}

interface ICalendarSlotTag {
  activated: boolean;
  label: string;
  shortLabel: string;
  type: string;
}

interface IRaportDetailDay {
  deliveries: IRaportDetailDayDelivery[];
  details: IRAportDetailDayDetail[];
}

interface IRaportDetailDayDelivery {
  deliveryId: number;
  firstOrderCancelled: boolean;
  firstOrderCode: string;
  id: number;
  isArchived: boolean;
  multiplier: string | null;
  orders: IRaportDetailDayDeliveryOrder[];
  secondOrderCancelled: boolean;
  secondOrderCode: string | null;
  startTime: string;
  tips: string;
  totalEarnings: string;
}

interface IRaportDetailDayDeliveryOrder {
  code: string;
  status: string;
}

interface IRAportDetailDayDetail {
  amount: string;
  description: string | null;
  name: string;
  type: string;
}

export interface ISWK {
  code: string;
  currency: string;
  currencyPattern: string;
  timeZone: string;
  languageCode: string;
  maxBillAccount: number;
  cashEnabled: boolean;
  emergencyNumber: string;
}

export interface IMe {
  allowCompensationUpgrade: boolean;
  autoAssignmentEnabled: boolean;
  cityCode: string;
  compensationUpgradeAvailable: boolean;
  countryCode: string;
  email: string;
  excellenceScore: number;
  excellenceScoreInfo: IExelenceScoreInfo;
  fidelityScore: number;
  forceNewPassword: boolean;
  formattedExcellenceScore: string;
  id: number;
  mapTransport: string;
  name: string;
  phoneNumber: IPhoneNumber;
  pictureUrl: string;
  preferredLanguage: string;
  rating: number;
  transport: string;
  type: string;
}

export interface IProfile {
  header: IProfileHeader;
  options: object[];
}

export interface IChallenges {
  challengesSections: IChallengeSection[];
  challengesUpdated: boolean;
}

export interface IDelivery {
  activeDeliveries: IActiveDelivery;
  currentDaySummary: IDeliverySummary;
}

export interface ICheckIn {
  body: string | null;
  checkinState: string | null;
  checkinType: string | null;
  extraInfo: string | null;
  note: string | null;
  timeInfo: string | null;
  title: string | null;
}

export interface IRaports {
  periodsSummary: IRaport[];
}

export interface ICalendar {
  calendarBlockInfo: string | null;
  countdown: number;
  currentLocaleTime: number;
  days: ICalendarDay[];
  nextShiftLabel: string | null;
}

export interface IRaportDetail {
  containsArchivedDeliveries: boolean;
  days: IRaportDetailDay[];
}

export enum CalendarSlotStatus {
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE',
  BOOKED = 'BOOKED',
}

export async function getSWKSettings(accessToken: string): Promise<ISWK | IError | undefined> {
  const response = await get<ISWK>(Endpoints.SWK_SETTINGS, accessToken);
  return response.parsedBody;
}

export async function getMe(accessToken: string): Promise<IMe | IError | undefined> {
  const response = await get<IMe>(Endpoints.ME, accessToken);
  return response.parsedBody;
}

export async function getProfile(accessToken: string): Promise<IProfile | IError | undefined> {
  const response = await get<IProfile>(Endpoints.PROFILE, accessToken);
  return response.parsedBody;
}

export async function getChallanges(accessToken: string): Promise<IChallenges | IError | undefined> {
  const response = await get<IChallenges>(Endpoints.CHALLENGES, accessToken);
  return response.parsedBody;
}

export async function getDeliveries(accessToken: string): Promise<IDelivery | IError | undefined> {
  const response = await get<IDelivery>(Endpoints.DELIVERIES, accessToken);
  return response.parsedBody;
}

export async function checkIn(accessToken: string): Promise<ICheckIn | IError | undefined> {
  const response = await get<ICheckIn>(Endpoints.CHECK_IN, accessToken);
  return response.parsedBody;
}

export async function getRaports(
  accessToken: string,
  limit: number = 20,
  offset: number = 0,
): Promise<IRaports | IError | undefined> {
  const response = await get<IRaports>(
    Endpoints.RAPORTS.replace('[LIMIT]', `${limit}`).replace('[OFFSET]', `${offset}`),
    accessToken,
  );
  return response.parsedBody;
}

export async function getCalendar(accessToken: string): Promise<ICalendar | IError | undefined> {
  const response = await get<ICalendar>(Endpoints.CALENDAR, accessToken);
  return response.parsedBody;
}

export async function getRaportDetails(
  accessToken: string,
  raportId: number,
): Promise<IRaportDetail | IError | undefined> {
  const response = await get<IRaportDetail>(
    Endpoints.RAPORT_DETAILS.replace('[RAPORT_ID]', `${raportId}`),
    accessToken,
  );
  return response.parsedBody;
}

export async function bookSlot(
  accessToken: string,
  slotId: number,
  slotBooked: boolean,
): Promise<ICalendar | IError | undefined> {
  const response = await put<ICalendar>(
    Endpoints.BOOK_SLOT.replace('[SLOT_ID]', `${slotId}`),
    { booked: slotBooked },
    accessToken,
  );
  return response.parsedBody;
}

export async function bookSlots(accessToken: string, slotIds: number[], slotBooked: boolean) {
  const responses: Promise<ICalendar | IError | undefined>[] = await slotIds.map((id, index) => {
    const delay = index * 1000;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(bookSlot(accessToken, id, slotBooked));
      }, delay);
    });
  });
  return responses;
}
