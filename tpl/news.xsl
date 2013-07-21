<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <ul class="articles">
            <xsl:apply-templates select="/response/newsList/news"/>
        </ul>
    </xsl:template>

    <xsl:template match="news">
        <li>
            <xsl:attribute name="data-id">
                <xsl:value-of select="id"/>
            </xsl:attribute>
            <xsl:value-of select="title"/>
            <xsl:text> </xsl:text>
            <span class="shortText">
                <xsl:value-of select="shortText"/>
            </span>
            <div class="date">
                <xsl:value-of select="date"/>
            </div>
        </li>
    </xsl:template>
</xsl:stylesheet>
