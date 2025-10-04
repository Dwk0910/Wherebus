package org.neatore.wherebus.object;

public record Station(
        int seq,
        String arsId,
        String direction,
        String stationNm,
        String transYn,
        String gpsX,
        String gpsY
) {
}