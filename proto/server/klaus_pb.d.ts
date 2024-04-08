// package: scoring
// file: klaus.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

export class TimePeriod extends jspb.Message { 

    hasStartdate(): boolean;
    clearStartdate(): void;
    getStartdate(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setStartdate(value?: google_protobuf_timestamp_pb.Timestamp): TimePeriod;

    hasEnddate(): boolean;
    clearEnddate(): void;
    getEnddate(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setEnddate(value?: google_protobuf_timestamp_pb.Timestamp): TimePeriod;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TimePeriod.AsObject;
    static toObject(includeInstance: boolean, msg: TimePeriod): TimePeriod.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TimePeriod, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TimePeriod;
    static deserializeBinaryFromReader(message: TimePeriod, reader: jspb.BinaryReader): TimePeriod;
}

export namespace TimePeriod {
    export type AsObject = {
        startdate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        enddate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    }
}

export class PeriodScore extends jspb.Message { 
    getPeriod(): string;
    setPeriod(value: string): PeriodScore;
    getScore(): number;
    setScore(value: number): PeriodScore;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PeriodScore.AsObject;
    static toObject(includeInstance: boolean, msg: PeriodScore): PeriodScore.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PeriodScore, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PeriodScore;
    static deserializeBinaryFromReader(message: PeriodScore, reader: jspb.BinaryReader): PeriodScore;
}

export namespace PeriodScore {
    export type AsObject = {
        period: string,
        score: number,
    }
}

export class AggregatedCategoryScore extends jspb.Message { 
    getId(): number;
    setId(value: number): AggregatedCategoryScore;
    getCategory(): string;
    setCategory(value: string): AggregatedCategoryScore;
    getRatingcount(): number;
    setRatingcount(value: number): AggregatedCategoryScore;
    clearPeriodscoreList(): void;
    getPeriodscoreList(): Array<PeriodScore>;
    setPeriodscoreList(value: Array<PeriodScore>): AggregatedCategoryScore;
    addPeriodscore(value?: PeriodScore, index?: number): PeriodScore;
    getScore(): number;
    setScore(value: number): AggregatedCategoryScore;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AggregatedCategoryScore.AsObject;
    static toObject(includeInstance: boolean, msg: AggregatedCategoryScore): AggregatedCategoryScore.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AggregatedCategoryScore, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AggregatedCategoryScore;
    static deserializeBinaryFromReader(message: AggregatedCategoryScore, reader: jspb.BinaryReader): AggregatedCategoryScore;
}

export namespace AggregatedCategoryScore {
    export type AsObject = {
        id: number,
        category: string,
        ratingcount: number,
        periodscoreList: Array<PeriodScore.AsObject>,
        score: number,
    }
}

export class TicketId extends jspb.Message { 
    getTicketid(): number;
    setTicketid(value: number): TicketId;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TicketId.AsObject;
    static toObject(includeInstance: boolean, msg: TicketId): TicketId.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TicketId, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TicketId;
    static deserializeBinaryFromReader(message: TicketId, reader: jspb.BinaryReader): TicketId;
}

export namespace TicketId {
    export type AsObject = {
        ticketid: number,
    }
}

export class TicketCategoryRating extends jspb.Message { 
    getRatingcategoryname(): string;
    setRatingcategoryname(value: string): TicketCategoryRating;
    getRating(): number;
    setRating(value: number): TicketCategoryRating;
    getWeight(): string;
    setWeight(value: string): TicketCategoryRating;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TicketCategoryRating.AsObject;
    static toObject(includeInstance: boolean, msg: TicketCategoryRating): TicketCategoryRating.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TicketCategoryRating, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TicketCategoryRating;
    static deserializeBinaryFromReader(message: TicketCategoryRating, reader: jspb.BinaryReader): TicketCategoryRating;
}

export namespace TicketCategoryRating {
    export type AsObject = {
        ratingcategoryname: string,
        rating: number,
        weight: string,
    }
}

export class TicketScore extends jspb.Message { 
    getTickettotalscore(): number;
    setTickettotalscore(value: number): TicketScore;
    clearTicketcategoryratingList(): void;
    getTicketcategoryratingList(): Array<TicketCategoryRating>;
    setTicketcategoryratingList(value: Array<TicketCategoryRating>): TicketScore;
    addTicketcategoryrating(value?: TicketCategoryRating, index?: number): TicketCategoryRating;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TicketScore.AsObject;
    static toObject(includeInstance: boolean, msg: TicketScore): TicketScore.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TicketScore, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TicketScore;
    static deserializeBinaryFromReader(message: TicketScore, reader: jspb.BinaryReader): TicketScore;
}

export namespace TicketScore {
    export type AsObject = {
        tickettotalscore: number,
        ticketcategoryratingList: Array<TicketCategoryRating.AsObject>,
    }
}

export class TicketCategoryScore extends jspb.Message { 
    getId(): number;
    setId(value: number): TicketCategoryScore;
    getName(): string;
    setName(value: string): TicketCategoryScore;
    getScore(): number;
    setScore(value: number): TicketCategoryScore;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TicketCategoryScore.AsObject;
    static toObject(includeInstance: boolean, msg: TicketCategoryScore): TicketCategoryScore.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TicketCategoryScore, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TicketCategoryScore;
    static deserializeBinaryFromReader(message: TicketCategoryScore, reader: jspb.BinaryReader): TicketCategoryScore;
}

export namespace TicketCategoryScore {
    export type AsObject = {
        id: number,
        name: string,
        score: number,
    }
}

export class AggregatedTicketScore extends jspb.Message { 
    getTicketid(): number;
    setTicketid(value: number): AggregatedTicketScore;
    clearTicketcategoryscoreList(): void;
    getTicketcategoryscoreList(): Array<TicketCategoryScore>;
    setTicketcategoryscoreList(value: Array<TicketCategoryScore>): AggregatedTicketScore;
    addTicketcategoryscore(value?: TicketCategoryScore, index?: number): TicketCategoryScore;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AggregatedTicketScore.AsObject;
    static toObject(includeInstance: boolean, msg: AggregatedTicketScore): AggregatedTicketScore.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AggregatedTicketScore, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AggregatedTicketScore;
    static deserializeBinaryFromReader(message: AggregatedTicketScore, reader: jspb.BinaryReader): AggregatedTicketScore;
}

export namespace AggregatedTicketScore {
    export type AsObject = {
        ticketid: number,
        ticketcategoryscoreList: Array<TicketCategoryScore.AsObject>,
    }
}

export class OverallScore extends jspb.Message { 
    getOverallscore(): number;
    setOverallscore(value: number): OverallScore;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): OverallScore.AsObject;
    static toObject(includeInstance: boolean, msg: OverallScore): OverallScore.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: OverallScore, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): OverallScore;
    static deserializeBinaryFromReader(message: OverallScore, reader: jspb.BinaryReader): OverallScore;
}

export namespace OverallScore {
    export type AsObject = {
        overallscore: number,
    }
}

export class ScoreChange extends jspb.Message { 
    getScorechangeabsolute(): number;
    setScorechangeabsolute(value: number): ScoreChange;
    getScorechangepercentagechange(): number;
    setScorechangepercentagechange(value: number): ScoreChange;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ScoreChange.AsObject;
    static toObject(includeInstance: boolean, msg: ScoreChange): ScoreChange.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ScoreChange, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ScoreChange;
    static deserializeBinaryFromReader(message: ScoreChange, reader: jspb.BinaryReader): ScoreChange;
}

export namespace ScoreChange {
    export type AsObject = {
        scorechangeabsolute: number,
        scorechangepercentagechange: number,
    }
}
