// package: scoring
// file: klaus.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as klaus_pb from "./klaus_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

interface IScoringService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getAggregatedCategoryScore: IScoringService_IGetAggregatedCategoryScore;
    getTicketScore: IScoringService_IGetTicketScore;
    getAggregatedTicketScore: IScoringService_IGetAggregatedTicketScore;
    getOverallScore: IScoringService_IGetOverallScore;
    getScoreChangeAgainstPreviousPeriod: IScoringService_IGetScoreChangeAgainstPreviousPeriod;
}

interface IScoringService_IGetAggregatedCategoryScore extends grpc.MethodDefinition<klaus_pb.TimePeriod, klaus_pb.AggregatedCategoryScore> {
    path: "/scoring.Scoring/GetAggregatedCategoryScore";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<klaus_pb.TimePeriod>;
    requestDeserialize: grpc.deserialize<klaus_pb.TimePeriod>;
    responseSerialize: grpc.serialize<klaus_pb.AggregatedCategoryScore>;
    responseDeserialize: grpc.deserialize<klaus_pb.AggregatedCategoryScore>;
}
interface IScoringService_IGetTicketScore extends grpc.MethodDefinition<klaus_pb.TicketId, klaus_pb.TicketScore> {
    path: "/scoring.Scoring/GetTicketScore";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<klaus_pb.TicketId>;
    requestDeserialize: grpc.deserialize<klaus_pb.TicketId>;
    responseSerialize: grpc.serialize<klaus_pb.TicketScore>;
    responseDeserialize: grpc.deserialize<klaus_pb.TicketScore>;
}
interface IScoringService_IGetAggregatedTicketScore extends grpc.MethodDefinition<klaus_pb.TimePeriod, klaus_pb.AggregatedTicketScore> {
    path: "/scoring.Scoring/GetAggregatedTicketScore";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<klaus_pb.TimePeriod>;
    requestDeserialize: grpc.deserialize<klaus_pb.TimePeriod>;
    responseSerialize: grpc.serialize<klaus_pb.AggregatedTicketScore>;
    responseDeserialize: grpc.deserialize<klaus_pb.AggregatedTicketScore>;
}
interface IScoringService_IGetOverallScore extends grpc.MethodDefinition<klaus_pb.TimePeriod, klaus_pb.OverallScore> {
    path: "/scoring.Scoring/GetOverallScore";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<klaus_pb.TimePeriod>;
    requestDeserialize: grpc.deserialize<klaus_pb.TimePeriod>;
    responseSerialize: grpc.serialize<klaus_pb.OverallScore>;
    responseDeserialize: grpc.deserialize<klaus_pb.OverallScore>;
}
interface IScoringService_IGetScoreChangeAgainstPreviousPeriod extends grpc.MethodDefinition<klaus_pb.TimePeriod, klaus_pb.ScoreChange> {
    path: "/scoring.Scoring/GetScoreChangeAgainstPreviousPeriod";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<klaus_pb.TimePeriod>;
    requestDeserialize: grpc.deserialize<klaus_pb.TimePeriod>;
    responseSerialize: grpc.serialize<klaus_pb.ScoreChange>;
    responseDeserialize: grpc.deserialize<klaus_pb.ScoreChange>;
}

export const ScoringService: IScoringService;

export interface IScoringServer extends grpc.UntypedServiceImplementation {
    getAggregatedCategoryScore: grpc.handleServerStreamingCall<klaus_pb.TimePeriod, klaus_pb.AggregatedCategoryScore>;
    getTicketScore: grpc.handleUnaryCall<klaus_pb.TicketId, klaus_pb.TicketScore>;
    getAggregatedTicketScore: grpc.handleServerStreamingCall<klaus_pb.TimePeriod, klaus_pb.AggregatedTicketScore>;
    getOverallScore: grpc.handleUnaryCall<klaus_pb.TimePeriod, klaus_pb.OverallScore>;
    getScoreChangeAgainstPreviousPeriod: grpc.handleUnaryCall<klaus_pb.TimePeriod, klaus_pb.ScoreChange>;
}

export interface IScoringClient {
    getAggregatedCategoryScore(request: klaus_pb.TimePeriod, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<klaus_pb.AggregatedCategoryScore>;
    getAggregatedCategoryScore(request: klaus_pb.TimePeriod, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<klaus_pb.AggregatedCategoryScore>;
    getTicketScore(request: klaus_pb.TicketId, callback: (error: grpc.ServiceError | null, response: klaus_pb.TicketScore) => void): grpc.ClientUnaryCall;
    getTicketScore(request: klaus_pb.TicketId, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: klaus_pb.TicketScore) => void): grpc.ClientUnaryCall;
    getTicketScore(request: klaus_pb.TicketId, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: klaus_pb.TicketScore) => void): grpc.ClientUnaryCall;
    getAggregatedTicketScore(request: klaus_pb.TimePeriod, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<klaus_pb.AggregatedTicketScore>;
    getAggregatedTicketScore(request: klaus_pb.TimePeriod, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<klaus_pb.AggregatedTicketScore>;
    getOverallScore(request: klaus_pb.TimePeriod, callback: (error: grpc.ServiceError | null, response: klaus_pb.OverallScore) => void): grpc.ClientUnaryCall;
    getOverallScore(request: klaus_pb.TimePeriod, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: klaus_pb.OverallScore) => void): grpc.ClientUnaryCall;
    getOverallScore(request: klaus_pb.TimePeriod, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: klaus_pb.OverallScore) => void): grpc.ClientUnaryCall;
    getScoreChangeAgainstPreviousPeriod(request: klaus_pb.TimePeriod, callback: (error: grpc.ServiceError | null, response: klaus_pb.ScoreChange) => void): grpc.ClientUnaryCall;
    getScoreChangeAgainstPreviousPeriod(request: klaus_pb.TimePeriod, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: klaus_pb.ScoreChange) => void): grpc.ClientUnaryCall;
    getScoreChangeAgainstPreviousPeriod(request: klaus_pb.TimePeriod, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: klaus_pb.ScoreChange) => void): grpc.ClientUnaryCall;
}

export class ScoringClient extends grpc.Client implements IScoringClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getAggregatedCategoryScore(request: klaus_pb.TimePeriod, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<klaus_pb.AggregatedCategoryScore>;
    public getAggregatedCategoryScore(request: klaus_pb.TimePeriod, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<klaus_pb.AggregatedCategoryScore>;
    public getTicketScore(request: klaus_pb.TicketId, callback: (error: grpc.ServiceError | null, response: klaus_pb.TicketScore) => void): grpc.ClientUnaryCall;
    public getTicketScore(request: klaus_pb.TicketId, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: klaus_pb.TicketScore) => void): grpc.ClientUnaryCall;
    public getTicketScore(request: klaus_pb.TicketId, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: klaus_pb.TicketScore) => void): grpc.ClientUnaryCall;
    public getAggregatedTicketScore(request: klaus_pb.TimePeriod, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<klaus_pb.AggregatedTicketScore>;
    public getAggregatedTicketScore(request: klaus_pb.TimePeriod, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<klaus_pb.AggregatedTicketScore>;
    public getOverallScore(request: klaus_pb.TimePeriod, callback: (error: grpc.ServiceError | null, response: klaus_pb.OverallScore) => void): grpc.ClientUnaryCall;
    public getOverallScore(request: klaus_pb.TimePeriod, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: klaus_pb.OverallScore) => void): grpc.ClientUnaryCall;
    public getOverallScore(request: klaus_pb.TimePeriod, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: klaus_pb.OverallScore) => void): grpc.ClientUnaryCall;
    public getScoreChangeAgainstPreviousPeriod(request: klaus_pb.TimePeriod, callback: (error: grpc.ServiceError | null, response: klaus_pb.ScoreChange) => void): grpc.ClientUnaryCall;
    public getScoreChangeAgainstPreviousPeriod(request: klaus_pb.TimePeriod, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: klaus_pb.ScoreChange) => void): grpc.ClientUnaryCall;
    public getScoreChangeAgainstPreviousPeriod(request: klaus_pb.TimePeriod, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: klaus_pb.ScoreChange) => void): grpc.ClientUnaryCall;
}
