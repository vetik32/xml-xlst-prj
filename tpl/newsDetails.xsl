<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:key name="newsById" match="news" use="id"/>

    <xsl:template match="/">
        <div class="detailedText">
            <xsl:apply-templates select="/response/newsList"/>
        </div>
    </xsl:template>

    <xsl:template match="newsList">
        <xsl:for-each select="*">
          <xsl:value-of select="text"/>
        </xsl:for-each>
    </xsl:template>
</xsl:stylesheet>
