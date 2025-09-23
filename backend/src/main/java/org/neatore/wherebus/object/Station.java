package org.neatore.wherebus.object;

public record Station(
        String arsId,
        String direction,
        String stationNm,
        String transYn,
        String gpsX,
        String gpsY
) {
}