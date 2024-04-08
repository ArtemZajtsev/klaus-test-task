// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var klaus_pb = require('./klaus_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

function serialize_scoring_AggregatedCategoryScore(arg) {
  if (!(arg instanceof klaus_pb.AggregatedCategoryScore)) {
    throw new Error('Expected argument of type scoring.AggregatedCategoryScore');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_scoring_AggregatedCategoryScore(buffer_arg) {
  return klaus_pb.AggregatedCategoryScore.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_scoring_AggregatedTicketScore(arg) {
  if (!(arg instanceof klaus_pb.AggregatedTicketScore)) {
    throw new Error('Expected argument of type scoring.AggregatedTicketScore');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_scoring_AggregatedTicketScore(buffer_arg) {
  return klaus_pb.AggregatedTicketScore.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_scoring_OverallScore(arg) {
  if (!(arg instanceof klaus_pb.OverallScore)) {
    throw new Error('Expected argument of type scoring.OverallScore');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_scoring_OverallScore(buffer_arg) {
  return klaus_pb.OverallScore.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_scoring_ScoreChange(arg) {
  if (!(arg instanceof klaus_pb.ScoreChange)) {
    throw new Error('Expected argument of type scoring.ScoreChange');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_scoring_ScoreChange(buffer_arg) {
  return klaus_pb.ScoreChange.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_scoring_TicketId(arg) {
  if (!(arg instanceof klaus_pb.TicketId)) {
    throw new Error('Expected argument of type scoring.TicketId');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_scoring_TicketId(buffer_arg) {
  return klaus_pb.TicketId.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_scoring_TicketScore(arg) {
  if (!(arg instanceof klaus_pb.TicketScore)) {
    throw new Error('Expected argument of type scoring.TicketScore');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_scoring_TicketScore(buffer_arg) {
  return klaus_pb.TicketScore.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_scoring_TimePeriod(arg) {
  if (!(arg instanceof klaus_pb.TimePeriod)) {
    throw new Error('Expected argument of type scoring.TimePeriod');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_scoring_TimePeriod(buffer_arg) {
  return klaus_pb.TimePeriod.deserializeBinary(new Uint8Array(buffer_arg));
}


var ScoringService = exports.ScoringService = {
  getAggregatedCategoryScore: {
    path: '/scoring.Scoring/GetAggregatedCategoryScore',
    requestStream: false,
    responseStream: true,
    requestType: klaus_pb.TimePeriod,
    responseType: klaus_pb.AggregatedCategoryScore,
    requestSerialize: serialize_scoring_TimePeriod,
    requestDeserialize: deserialize_scoring_TimePeriod,
    responseSerialize: serialize_scoring_AggregatedCategoryScore,
    responseDeserialize: deserialize_scoring_AggregatedCategoryScore,
  },
  getTicketScore: {
    path: '/scoring.Scoring/GetTicketScore',
    requestStream: false,
    responseStream: false,
    requestType: klaus_pb.TicketId,
    responseType: klaus_pb.TicketScore,
    requestSerialize: serialize_scoring_TicketId,
    requestDeserialize: deserialize_scoring_TicketId,
    responseSerialize: serialize_scoring_TicketScore,
    responseDeserialize: deserialize_scoring_TicketScore,
  },
  getAggregatedTicketScore: {
    path: '/scoring.Scoring/GetAggregatedTicketScore',
    requestStream: false,
    responseStream: true,
    requestType: klaus_pb.TimePeriod,
    responseType: klaus_pb.AggregatedTicketScore,
    requestSerialize: serialize_scoring_TimePeriod,
    requestDeserialize: deserialize_scoring_TimePeriod,
    responseSerialize: serialize_scoring_AggregatedTicketScore,
    responseDeserialize: deserialize_scoring_AggregatedTicketScore,
  },
  getOverallScore: {
    path: '/scoring.Scoring/GetOverallScore',
    requestStream: false,
    responseStream: false,
    requestType: klaus_pb.TimePeriod,
    responseType: klaus_pb.OverallScore,
    requestSerialize: serialize_scoring_TimePeriod,
    requestDeserialize: deserialize_scoring_TimePeriod,
    responseSerialize: serialize_scoring_OverallScore,
    responseDeserialize: deserialize_scoring_OverallScore,
  },
  getScoreChangeAgainstPreviousPeriod: {
    path: '/scoring.Scoring/GetScoreChangeAgainstPreviousPeriod',
    requestStream: false,
    responseStream: false,
    requestType: klaus_pb.TimePeriod,
    responseType: klaus_pb.ScoreChange,
    requestSerialize: serialize_scoring_TimePeriod,
    requestDeserialize: deserialize_scoring_TimePeriod,
    responseSerialize: serialize_scoring_ScoreChange,
    responseDeserialize: deserialize_scoring_ScoreChange,
  },
};

exports.ScoringClient = grpc.makeGenericClientConstructor(ScoringService);
